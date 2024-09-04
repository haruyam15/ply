// hooks/useDeleteItem.ts
import { useState } from 'react';
import { deleteItemFromServer } from '@/utils/api';

const useDeleteItem = (onDeleteSuccess: (id: string) => void) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = async (id: string) => {
    setIsDeleting(true);
    const success = await deleteItemFromServer(id);
    if (success) {
      onDeleteSuccess(id);
    }
    setIsDeleting(false);
  };

  return { deleteItem, isDeleting };
};

export default useDeleteItem;
