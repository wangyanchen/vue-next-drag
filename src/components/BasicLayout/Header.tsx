import {defineComponent} from "vue";
import {useStore} from "../../store";
import {properBase} from "../../uses/propertyBase";
import {clearSnapshot, delSnapshot} from "../../uses/snapshop";

export default defineComponent({
  name: 'Header',
  setup(props) {
    const store = properBase().store;
    const activeWidget = properBase().widget;
    const currentSnapshot = properBase().currentSnapshot;

    const changeIndex = (num: number) => {
      store.commit('setCurrentIndex', store.state.currentIndex + num);
    }

    const handleDel = () => {
      delSnapshot(activeWidget.value!.id!, store);
    }
    const handleClear = () => {
      clearSnapshot(store);
    }

    return () => {
      return (
        <div class="wrap">
          <h2>vue3-ts-drag && { store.state.currentIndex }</h2>
          <el-button-group className="actions">
            <el-button onClick={ changeIndex.bind(null, -1) } disabled={ store.state.currentIndex === -1 }>后退</el-button>
            <el-button onClick={ changeIndex.bind(null, 1) } disabled={ store.state.currentIndex === store.state.snapshots.length - 1 }>前进</el-button>
            <el-button type="primary">保存</el-button>
            <el-button type="warning" onClick={ handleDel } disabled={ activeWidget.value === undefined }>删除</el-button>
            <el-button type="danger" onClick={ handleClear } disabled={ currentSnapshot.value.length === 0 }>清空</el-button>
          </el-button-group>
        </div>
      );
    }
  }
});
