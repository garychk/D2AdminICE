<template>
  <d2-container class="page">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <HistogramChart/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <NormalToggleChart/>
        </div>
      </el-col>
    </el-row>   
    
    <ScatterChart/>
  </d2-container>
</template>

<script>
import NormalToggleChart from "./components/NormalToggleChart";
import HistogramChart from "./components/HistogramChart";
import ScatterChart from "./components/ScatterChart";
export default {
  components: {
    HistogramChart,
    NormalToggleChart,
    ScatterChart
  },
  data() {
    return {
      toolbox: {}
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
