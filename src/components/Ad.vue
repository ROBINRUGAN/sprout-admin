<template>
  <div class="adData">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      "
    >
      <div style="display: flex; justify-content: space-between; width: 125px; align-items: center">
        <h1>广告统计</h1>
        <p style="font-size: 12px">(近七日)</p>
      </div>
    </div>

    <div ref="adContainer" style="width: 100%; height: 300px"></div>
  </div>
</template>
