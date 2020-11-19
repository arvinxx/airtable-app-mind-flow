import { useStore } from 'stook';
declare module 'stook' {
  interface Key {
    isDrillDown: string;
    drillDownId: string;
    recordChain: string;
  }
}

export const useLocalStore = () => {
  const [isDrillDown, setIsDrillDown] = useStore('isDrillDown', false);
  const [drillDownId, setDrillDownId] = useStore('drillDownId', '');
  const [recordChain, setRecordChain] = useStore<
    { id: string; name: string }[]
  >('recordChain', []);

  return {
    isDrillDown,
    setIsDrillDown,
    /**
     * 激活下钻
     * @param id
     * @param recordChain
     */
    activeDrillDown: (id, recordChain) => {
      setIsDrillDown(true);
      setDrillDownId(id);
      setRecordChain(recordChain);
    },
    /**
     * 取消下钻
     */
    deActiveDrillDown: () => {
      setIsDrillDown(false);
    },
    /**
     * 设置下钻起点节点
     */
    setDrillDownNode: (id) => {
      setDrillDownId(id);
    },
    /**
     * 下钻的记录链条
     */
    recordChain,
    drillDownId,
  };
};
