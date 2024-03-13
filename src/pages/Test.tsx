import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const Test = () => {
  const [number, setNumber] = useState<any>(0);
  const [dark, setDark] = useState<boolean>(false);
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const getItems = useMyCallBack(() => {
    return [number, number + 1, number + 2];
  }, [number]);

  useEffect(() => {
    console.log("theme changed");
  }, [themeStyles]);

  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        change background
      </button>
      <div style={themeStyles}>
        {doubleNumber}
        <List getItems={getItems} />
      </div>
    </>
  );
};

const slowFunction = (num: any) => {
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
};

export default Test;

const List = ({ getItems }: any) => {
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    setItems(getItems(5));
    console.log("updating items");
  }, [getItems]);

  return items.map((item: any) => <div key={item}>{item}</div>);
};

const isDepChange = (old: any, newDep: any) => {
  if (!old || !newDep || old.length !== newDep.length) return true;
  for (let i = 0; i < old.length; i++) {
    if (old[i] !== newDep[i]) return true;
  }

  return false;
};

const useMyCallBack = (fun: any, dep: any) => {
  const myVal = useRef([fun, dep]).current;

  if (isDepChange(myVal[1], dep)) {
    myVal[0] = fun;
    myVal[1] = dep;
  }

  return myVal[0];
};
