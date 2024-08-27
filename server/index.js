import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()

const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL

const sampleDBName = 'hansarang3club'
let database

async function connectToDB() {
	try {
		const client = await MongoClient.connect(MONGOURL)
		database = client.db(sampleDBName)
		app.listen(PORT, () => console.log(`MongoDB listening on ${PORT}`))
	} catch (error) {
		console.error(error)
	}
}
connectToDB()

app.post('/api/login', async (req, res) => {
	const { userid, password } = req.body
	try {
		const user = await database.collection('users').findOne({ 'information.userid': userid , 'information.password': password  })
		if (user) {
			res.status(200).send({ message: 'Login successful', user })
		} else {
			res.status(401).send({ message: 'Invalid userid or password' })
		}
	} catch (error) {
		res.status(500).send(error)
	}
})
// 로그인 성공 curl -X GET "http://localhost:8080/api/login?userid=johndoe&password=john1234"
// 로그인 실패 curl -X GET "http://localhost:8080/api/login?userid=invaliduser&password=invalidpass"

app.post('/api/signup/validate', async (req, res) => {
	const { userid, nickname } = req.body
	try {
    const foundUser = await database.collection('users').findOne({
      $or: [{ 'information.userid': userid }, { 'information.nickname': nickname }]
    });
    if (foundUser) {
      if (foundUser.information.userid === userid) {
        return res.status(400).send({ field:'userid', message: 'ID is already taken' });
      }
      if (foundUser.information.nickname === nickname) {
        return res.status(400).send({ field:'nickname',message: 'Nickname is already taken' });
      }
    }
    res.status(200).send({ message: 'Validation successful' });
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/api/register', async (req, res) => {
	const { userid, password, nickname } = req.body
	if (!userid || !password || !nickname) {
    return res.status(400).send({ message: 'All fields are required' })
  }
	try {
		const newUser = {
			id: userid,
			information: {
				userid,
        password,
        profileimage: '',
        nickname,
			},
			like: [],
			following: [],
      followers: []
		}
		const result = await database.collection('users').insertOne(newUser)
		res.status(201).send({ message: 'User registered successfully', userId: result.insertedId })
	} catch (error) {
		res.status(500).send(error)
	}
})
// curl -X POST "http://localhost:8080/api/register" -H "Content-Type: application/json" -d '{"userid":"johndoe","password":"john1234","profileimage":"","nickname":"Johnny"}' ( 회원가입 )

app.post('/api/followers', async (req, res) => {
	const { userid } = req.body
	try {
		const user = await database.collection('users').findOne({ 'information.userid': userid })
		if (user) {
			res.status(200).send({ followers: user.followers })
		} else {
			res.status(404).send({ message: 'User not found' })
		}
	} catch (error) {
		res.status(500).send(error)
	}
})
//curl -X GET "http://localhost:8080/api/followers?userid=johndoe" ( 해당 유저의 팔로워 목록 )

app.get('/api/following', async (req, res) => {
	const { userid } = req.query
	try {
		const user = await database.collection('users').findOne({ 'information.userid': userid })
		if (user) {
			res.status(200).send({ following: user.following })
		} else {
			res.status(404).send({ message: 'User not found' })
		}
	} catch (error) {
		res.status(500).send(error)
	}
})
// curl -X GET "http://localhost:8080/api/following?userid=johndoe" ( 해당 유저가 팔로잉하는 유저들 )

app.get('/api/likes', async (req, res) => {
	const { userid } = req.query
	try {
		const user = await database.collection('users').findOne({ 'information.userid': userid })
		if (user) {
			res.status(200).send({ likes: user.like })
		} else {
			res.status(404).send({ message: 'User not found' })
		}
	} catch (error) {
		res.status(500).send(error)
	}
})
// curl -X GET "http://localhost:8080/api/likes?userid=johndoe" ( 해당 유저가 좋아요한 플리 )

app.get('/api/myPlayList', async (req, res) => {
	const { userid } = req.query
	try {
		const user = await database.collection('users').findOne({ 'information.userid': userid })
		if (user) {
			res.status(200).send({ myPlayList: user.myPlayList })
		} else {
			res.status(404).send({ message: 'User not found' })
		}
	} catch (error) {
		res.status(500).send(error)
	}
})
// curl -X GET "http://localhost:8080/api/myPlayList?userid=johndoe" ( 해당 유저가 만든 플레이리스트 )

app.get('/api/playlist', async (req, res) => {
	const { title } = req.query
	try {
		const playlist = await database.collection('playListData').findOne({ title })
		if (playlist) {
			res.status(200).send(playlist)
		} else {
			res.status(404).send({ message: 'Playlist not found' })
		}
	} catch (error) {
		res.status(500).send(error)
	}
})
// curl -X GET "http://localhost:8080/api/playlist?title=Playlist%201" ( 플레이 리스트 상세 )

app.get('/api/playlists/ids', async (req, res) => {
	try {
		const playlists = await database
			.collection('playListData')
			.find({}, { projection: { _id: 1 } })
			.toArray()
		res.status(200).send(playlists)
	} catch (error) {
		res.status(500).send(error)
	}
})
// curl -X GET "http://localhost:8080/api/playlists/ids" ( 모든 플리 탐색에서 씀 )

app.post('/api/update-profile', async (req, res) => {
	const { userid, password, profileimage, nickname } = req.body;

	try {
		// 1. 유저 ID로 유저 정보 조회
		const user = await database.collection('information').findOne({ userid });
		if (!user) {
			return res.status(404).send({ message: 'User not found' });
		}

		// 2. 유저 정보 수정
		const updatedUser = {
			...(password && { password }),
			...(profileimage && { profileimage }),
			...(nickname && { nickname }),
		};

		// 3. 수정사항 적용
		await database.collection('information').updateOne({ userid }, { $set: updatedUser });

		await database.collection('users').updateOne(
			{ 'information.userid': userid },
			{ $set: { 'information.password': password, 'information.profileimage': profileimage, 'information.nickname': nickname } }
		);

		res.status(200).send({ message: 'User profile updated successfully' });
	} catch (error) {
		res.status(500).send({ message: 'Failed to update user profile', error });
	}
});
// curl -X POST "http://localhost:8080/api/update-profile" -H "Content-Type: application/json" -d '{"userid":"johnnew","password":"sword123","profileimage":"mage.jpg","nickname":"JoedNew"}' ( 프로필 수정 )

app.post('/api/add-comment', async (req, res) => {
	const { title, userid, comment } = req.body

	try {
		// 주어진 제목으로 플레이리스트를 찾음
		const playlist = await database.collection('playListData').findOne({ title })
		if (!playlist) {
			return res.status(404).send({ message: '플레이리스트를 찾을 수 없습니다.' })
		}

		// 댓글 추가
		const updatedComments = {
			...playlist.comments,
			[userid]: comment,
		}

		// 플레이리스트의 comments 필드 업데이트
		await database
			.collection('playListData')
			.updateOne({ title }, { $set: { comments: updatedComments } })

		res.status(200).send({ message: '댓글이 성공적으로 추가되었습니다.' })
	} catch (error) {
		res.status(500).send({ message: '댓글 추가에 실패했습니다.', error })
	}
})
// curl -X POST -H "Content-Type: application/json" -d '{"title": "Playlist 1", "userid": "user3", "comment": "Amazing selection!"}' http://localhost:8080/api/add-comment


app.post('/api/add-like', async (req, res) => {
	const { title, userid } = req.body

	try {
		// 주어진 제목으로 플레이리스트를 찾음
		const playlist = await database.collection('playListData').findOne({ title })
		if (!playlist) {
			return res.status(404).send({ message: '플레이리스트를 찾을 수 없습니다.' })
		}

		// 사용자가 이미 이 플레이리스트를 좋아요한 경우를 확인
		if (playlist.like.includes(userid)) {
			return res.status(400).send({ message: '사용자가 이미 이 플레이리스트를 좋아요했습니다.' })
		}

		// 좋아요 배열에 새로운 사용자 ID를 추가하고 좋아요 수를 증가시킴
		const updatedLikes = [...playlist.like, userid]
		const updatedNumOfLike = playlist.numOfLike + 1

		// 플레이리스트 문서를 새로운 좋아요와 좋아요 수로 업데이트
		await database
			.collection('playListData')
			.updateOne({ title }, { $set: { like: updatedLikes, numOfLike: updatedNumOfLike } })

		res.status(200).send({ message: '좋아요가 성공적으로 추가되었습니다.' })
	} catch (error) {
		res.status(500).send({ message: '좋아요 추가에 실패했습니다.', error })
	}
})
// curl -X POST -H "Content-Type: application/json" -d '{"title": "Playlist 1", "userid": "user3"}' http://localhost:8080/api/add-like