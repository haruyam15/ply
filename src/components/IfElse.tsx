import { ReactNode, ReactElement, Children, isValidElement } from 'react';

interface IThenProps {
  children: ReactNode;
}

interface IElseProps {
  children: ReactNode;
}

interface IIfProps {
  test: boolean;
  children: ReactNode;
}

const Then: React.FC<IThenProps> = ({ children }) => <>{children}</>;
const Else: React.FC<IElseProps> = ({ children }) => <>{children}</>;

const If: React.FC<IIfProps> & {
  Then: React.FC<IThenProps>;
  Else: React.FC<IElseProps>;
} = ({ test, children }) => {
  let thenNode: ReactElement | null = null;
  let elseNode: ReactElement | null = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === If.Then) {
        thenNode = child;
      } else if (child.type === If.Else) {
        elseNode = child;
      }
    }
  });

  return test ? thenNode : elseNode;
};

If.Then = Then;
If.Else = Else;

export { If };
