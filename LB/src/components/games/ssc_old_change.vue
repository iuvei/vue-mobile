<template>
    <div class="main-width game-ssc">
      <div class="game-ssc-nav clear-fix">
        <ul class="ssc-nav-items">
          <li class="ssc-nav-item now-hov">
            <a href="javascript:;">
              整合
            </a>
          </li>
          <li class="ssc-nav-item">
            <a href="javascript:;">
              第一球
            </a>
          </li>
          <li class="ssc-nav-item">
            <a href="javascript:;">
              第二球
            </a>
          </li>
          <li class="ssc-nav-item">
            <a href="javascript:;">
              第三球
            </a>
          </li>
          <li class="ssc-nav-item">
            <a href="javascript:;">
              第四球
            </a>
          </li>
          <li class="ssc-nav-item">
            <a href="javascript:;">
              第五球
            </a>
          </li>
          <li class="ssc-nav-item">
            <a href="javascript:;">
              龙虎斗
            </a>
          </li>
        </ul>
        <div class="is-official">
          <a href="javascript:;">
            官方
            <span class="ball"></span>
          </a>
        </div>
      </div>
      <div class="game-ssc-content clear-fix">
        <div class="game-ssc-content-left">
          <div class="game-ssc-content-left-top">
            <div class="clear-fix">
              <ul class="clear-fix">
                <li>
                  奖金 : <i>1.2%</i>
                </li>
                <li class="clear-fix">
                  <a class="cut" href="javascript:;">-</a>
                  <div>
                    <el-slider v-model="bonus"></el-slider>
                  </div>
                  <a class="add" href="javascript:;">+</a>
                </li>
                <li>
                  金额 :
                  <el-input-number size="mini" v-model="count" :min="1" :max="10" label="描述文字"></el-input-number>
                </li>
              </ul>
              <div class="btns clear-fix">
                <a class="now-hov" href="javascript:;">一般</a>
                <a href="javascript:;">快捷</a>
                <a href="javascript:;">快选金额</a>
              </div>
            </div>
          </div>
          <div class="game-ssc-content-left-table">
            <div class="zh-lhh">
              <div class="zh-lhh-header">
                总和 - 龙虎和
              </div>
              <ul class="play-types clear-fix">
                <li>
                  <ul>
                    <li class="clear-fix">
                      <span class="bet-name">总和大</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                    <li class="clear-fix">
                      <span class="bet-name">龙</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="clear-fix">
                      <span class="bet-name">总和大</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                    <li class="clear-fix">
                      <span class="bet-name">龙</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="clear-fix">
                      <span class="bet-name">总和大</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                    <li class="clear-fix">
                      <span class="bet-name">龙</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="clear-fix">
                      <span class="bet-name">总和大</span>
                      <span class="odds">1.999</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="digital-quiz">
              <ul class="digital-quiz-items clear-fix">
                <li>
                  <ul>
                    <li class="digital-quiz-title">万位</li>
                    <!---------------->
                    <li>
                      <span class="big-small-single-double">大</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">小</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">单</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">双</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <!----------------------->
                    <li>
                      <span class="bet-number">0</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">1</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">2</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">3</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">4</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">5</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">6</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">7</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">8</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">9</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="digital-quiz-title">万位</li>
                    <!---------------->
                    <li>
                      <span class="big-small-single-double">大</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">小</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">单</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">双</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <!----------------------->
                    <li>
                      <span class="bet-number">0</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">1</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">2</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">3</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">4</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">5</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">6</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">7</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">8</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">9</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="digital-quiz-title">万位</li>
                    <!---------------->
                    <li>
                      <span class="big-small-single-double">大</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">小</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">单</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">双</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <!----------------------->
                    <li>
                      <span class="bet-number">0</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">1</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">2</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">3</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">4</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">5</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">6</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">7</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">8</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">9</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="digital-quiz-title">万位</li>
                    <!---------------->
                    <li>
                      <span class="big-small-single-double">大</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">小</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">单</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">双</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <!----------------------->
                    <li>
                      <span class="bet-number">0</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">1</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">2</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">3</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">4</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">5</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">6</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">7</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">8</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">9</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li class="digital-quiz-title">万位</li>
                    <!---------------->
                    <li>
                      <span class="big-small-single-double">大</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">小</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">单</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="big-small-single-double">双</span>
                      <span class="odds">1.98</span>
                      <input class="input-count" type="text">
                    </li>
                    <!----------------------->
                    <li>
                      <span class="bet-number">0</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">1</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">2</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">3</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">4</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">5</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">6</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">7</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">8</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                    <li>
                      <span class="bet-number">9</span>
                      <span class="odds">9.9</span>
                      <input class="input-count" type="text">
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="qs">
              <div class="qs-title">
                前三
              </div>
              <ul class="qs-items clear-fix">
                <li>
                  <span class="bet-name">豹子</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">顺子</span>
                  <span class="odds">13</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">对子</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">杂六</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">半顺</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
              </ul>
            </div>
            <div class="zs">
              <div class="zs-title">
                中三
              </div>
              <ul class="zs-items clear-fix">
                <li>
                  <span class="bet-name">豹子</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">顺子</span>
                  <span class="odds">13</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">对子</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">杂六</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">半顺</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
              </ul>
            </div>
            <div class="hs">
              <div class="hs-title">
                后三
              </div>
              <ul class="hs-items clear-fix">
                <li>
                  <span class="bet-name">豹子</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">顺子</span>
                  <span class="odds">13</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">对子</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">杂六</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
                <li>
                  <span class="bet-name">半顺</span>
                  <span class="odds">78</span>
                  <input class="input-count" type="text">
                </li>
              </ul>
            </div>
            <div class="btns">
              <a href="javascript:;">
                确认投注 <img :src="determineBet" :alt="determineBet">
              </a>
              <a href="javascript:;">
                清空选号 <img :src="clearChoice" :alt="clearChoice">
              </a>
            </div>
          </div>
        </div>
        <div class="game-ssc-content-right">
          <div class="tabs">
            <a class="now-hov" href="javascript:;">出碼排行</a>
            <a href="javascript:;">遗漏排行</a>
          </div>
          <div class="periods-number">
            期数：
            <el-dropdown>
              <span class="el-dropdown-link">
                2期<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>3期</el-dropdown-item>
                <el-dropdown-item>4期</el-dropdown-item>
                <el-dropdown-item>5期</el-dropdown-item>
                <el-dropdown-item disabled>6期</el-dropdown-item>
                <el-dropdown-item divided>7期</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <ul class="periods-show">
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
            <li class="clear-fix">
              <span>第四球单双</span>
              <span>@大</span>
              <span>6期</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="law-table clear-fix">
        <div class="law-table-header clear-fix">
          <div class="select_wrapper">
            <el-select size="mini" v-model="selectModel" placeholder="">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="btns clear-fix">
            <a class="now-hov" href="javascript:;">球号</a>
            <a href="javascript:;">单双</a>
            <a href="javascript:;">大小</a>
            <a href="javascript:;">总和单双</a>
            <a href="javascript:;">总和大小</a>
          </div>
          <a href="javascript:;" class="shrink">
            <img :src="shrinkIcon" alt="shrinkIcon">
          </a>
        </div>
        <div class="dalu-table clear-fix">
          <div class="table-title">大路</div>
          <table class="dalu">
            <tr v-for="item in 6" :key="item">
              <td v-for="itemInner in 54" :key="itemInner">
                <div :class="{ 'blue': item % 2, 'red': item % 3, 'no_bg': item % 5 }">{{ item % 3 === 0 ? '' : item }}</div>
              </td>
            </tr>
          </table>
        </div>
        <div class="tables clear-fix">
          <div class="zpl-table clear-fix table">
            <div class="table-title">珠盘路</div>
            <table class="zpl">
              <tr v-for="item in 6" :key="item">
                <td v-for="itemInner in 12" :key="itemInner">
                  <div :class="{ 'blue': item % 2, 'red': item % 3, 'no_bg': item % 5 }">{{ item % 3 === 0 ? '' : item }}</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="dyl-table clear-fix table">
            <div class="table-title">大眼路</div>
            <table class="dyl">
              <tr v-for="item in 6" :key="item">
                <td v-for="itemInner in 14" :key="itemInner">
                  <div :class="{ 'blue': item % 2, 'red': item % 3, 'no_bg': item % 5 }">{{ item % 3 === 0 ? '' : item }}</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="xl-table clear-fix table">
            <div class="table-title">小路</div>
            <table class="xl">
              <tr v-for="item in 6" :key="item">
                <td v-for="itemInner in 12" :key="itemInner">
                  <div :class="{ 'blue': item % 2, 'red': item % 3, 'no_bg': item % 5 }">{{ item % 3 === 0 ? '' : item }}</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="yzl-table clear-fix table">
            <div class="table-title">曱甴路</div>
            <table class="yzl">
              <tr v-for="item in 6" :key="item">
                <td v-for="itemInner in 10" :key="itemInner">
                  <div :class="{ 'blue': item % 2, 'red': item % 3, 'no_bg': item % 5 }">{{ item % 3 === 0 ? '' : item }}</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <betting-record></betting-record>
    </div>
</template>

<script>
import determineBet from '../../statics/img/determine_bet.png'
import clearChoice from '../../statics/img/clear_icon.png'
import shrinkIcon from '../../statics/img/shrink.png'
import bettingRecord from '../betting-record/betting-record'
export default {
  components: { bettingRecord },
  data () {
    return {
      shrinkIcon,
      bonus: 0,
      count: 10,
      determineBet,
      clearChoice,
      selectModel: '',
      options: [1, 2, 3]
    }
  }
}
</script>

<style scoped>
  .input-count {
    width: 43px;
    height: 16px;
    line-height: 16px;
    border: 1px solid #e6e6e6;
    text-align: center;
    font-size: 11px;
  }
  /*---------------------*/
  .game-ssc {
    margin-top: 10px;
    /*border: 1px solid #6c6c6c;*/
    border-top: none;
  }
  .game-ssc-nav {
    height: 41px;
    position: relative;
    background-color: #cbcbcb;
  }
  .game-ssc-nav .ssc-nav-items {
    float: left;
  }
  .game-ssc-nav .ssc-nav-items .ssc-nav-item {
    float: left;
    width: 73px;
    text-align: center;
    line-height: 41px;
    color: #3f3f3f;
    font-size: 14px;
  }
  .game-ssc-nav .ssc-nav-items .ssc-nav-item.now-hov {
    background-color: #ededed;
    position: relative;
  }
  .game-ssc-nav .ssc-nav-items .ssc-nav-item.now-hov::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: -3px;
    background-color: #ac9e75;
    width: 73px;
    height: 3px;
    border-top: 1px solid #ededed;
    border-right: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
  }
  .game-ssc-nav .ssc-nav-items .ssc-nav-item a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .game-ssc-nav .is-official {
    float: right;
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    width: 85px;
    height: 25px;
    background: url("../../statics/img/game_nav_is_official_bg.png") no-repeat 0 0;
  }
  .game-ssc-nav .is-official a {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    color: #fcf5f5;
  }
  .game-ssc-nav .is-official a .ball {
    position: absolute;
    width: 24px;
    height: 26px;
    background: url("../../statics/img/game_nav_is_official_ball.png") no-repeat 0 0;
    right: 0;
    top: 0;
  }
  .game-ssc-content {
    padding-left: 26px;
    background-color: #eeeeee;
  }
  .game-ssc-content > div {
    float: left;
  }
  .game-ssc-content-left {
    width: 707px;
  }
  .game-ssc-content-left-top {
    line-height: 46px;
    padding-right: 4px;
  }
  .game-ssc-content-left-top > div >ul {
    float: left;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(1) {
    color: #8a8a8a;
    margin-right: 22px;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(1) i {
    font-style: normal;
  }
  .game-ssc-content-left-top ul > li {
    float: left;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) {
    width: 170px;
    height: 46px;
    position: relative;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) > * {
    float: left;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) a {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 19px;
    height: 19px;
    border: 1px solid #c8c8c8;
    border-radius: 2px;
    text-align: center;
    line-height: 15px;
    font-weight: bold;
    font-size: 14px;
    background-color: #f8f6f3;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) .add {
    right: 0;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) .cut {
    left: 0;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) > div {
    width: 110px;
    margin-left: 30px;
    margin-top: 4px;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(3) {
    margin-left: 30px;
    color: #8a8a8a;
  }

  .game-ssc-content-left-top .btns {
    float: right;
  }
  .game-ssc-content-left-top .btns a {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 5px;
    color: #ffffff;
    background-color: #bbbbbb;
  }
  .game-ssc-content-left-top .btns a.now-hov {
    background-color: #c82727;
    border: 1px solid #db8b8b;
  }
  .game-ssc-content-left-top .btns a:nth-of-type(2) {
    margin: 0 9px;
    width: 40px;
  }
  .game-ssc-content-left-top .btns a:nth-of-type(1) {
    width: 41px;
  }
  .game-ssc-content-left-top .btns a:nth-of-type(3) {
    width: 64px;
  }
  .game-ssc-content-left-table {}
  .game-ssc-content-left-table .zh-lhh {}
  .game-ssc-content-left-table .zh-lhh .play-types {}
  .game-ssc-content-left-table .zh-lhh .play-types > li {
    float: left;
    width: 176px;
    height: 61px;
    border-left: 1px dashed #cccccc;
    padding: 9px 0;
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li:nth-last-of-type(1) {
    border-right: 1px dashed #cccccc;
    width: 179px;
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul {}
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul > li{
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul > li:nth-of-type(1){
    margin-bottom: 11px;
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul > li > * {
    float: left;
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul > li > span:nth-of-type(1) {
    width: 67px;
    color: #777777;
    line-height: 16px;
    font-size: 12px;
    text-align: center;
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul > li > span:nth-of-type(2) {
    font-size: 12px;
    color: #9e916c;
    line-height: 16px;
    margin-right: 10px;
  }
  .game-ssc-content-left-table .zh-lhh .play-types > li > ul > li > input {
  }
  .game-ssc-content-left-table .zh-lhh .zh-lhh-header {
    height: 21px;
    background-color: #a79a72;
    line-height: 21px;
    font-size: 11px;
    color: #fff;
    text-align: center;
  }
  .digital-quiz {}
  .digital-quiz .digital-quiz-items {}
  .digital-quiz .digital-quiz-items > li {
    float: left;
    width: 141px;
    border-left: 1px dashed #dbdbdb;
  }
  .digital-quiz .digital-quiz-items > li > ul {}
  .digital-quiz .digital-quiz-items > li > ul > li:not(.digital-quiz-title) {
    height: 21px;
    line-height: 21px;
    margin-bottom: 5px;
  }
  .digital-quiz .digital-quiz-items > li > ul > li span:nth-of-type(1) {
    display: inline-block;
    text-align: center;
    line-height: 22px;
    margin: 0 10px 0 17px;
    font-size: 11.5px;
    color: #777777;
    width: 22px;
    height: 22px;
  }
  .digital-quiz .digital-quiz-items > li > ul > li span:nth-of-type(1).bet-number {
    border-radius: 50%;
    border: 1px solid #d8d8d8;
    color: #777777;
  }
  .digital-quiz .digital-quiz-items > li > ul > li span:nth-of-type(2) {
    font-size: 12px;
    color: #9e916c;
    display: inline-block;
    width: 32px;
    text-align: left;
  }
  .digital-quiz .digital-quiz-items > li > ul > li .big-small-single-double {
    background: url("../../statics/img/da_xiao_dan_shuang_bg.png") no-repeat 0 0;
  }
  .digital-quiz .digital-quiz-items > li > ul > li.digital-quiz-title {
    text-align: center;
    line-height: 21px;
    background-color: #a79972;
    color: #FFFFFF;
    margin-bottom: 7px;
  }
  .digital-quiz .digital-quiz-items > li:nth-last-of-type(1) {
    width: 143px;
    border-right: 1px dashed #dbdbdb;
  }
  .qs .qs-title,
  .hs .hs-title,
  .zs .zs-title {
    height: 21px;
    text-align: center;
    background-color: #a69871;
    line-height: 21px;
    color: #fff;
    border-top: 1px solid #cdc6b2;
    border-bottom: 1px solid #cdc6b2;
  }
  .qs .qs-items > li,
  .hs .hs-items > li,
  .zs .zs-items > li {
    float: left;
    width: 141px;
    border-left: 1px dashed #dadada;
    height: 34px;
    line-height: 34px;
  }
  .zs .zs-items > li:nth-last-of-type(1),
  .hs .hs-items > li:nth-last-of-type(1),
  .qs .qs-items > li:nth-last-of-type(1) {
    width: 143px;
    border-right: 1px dashed #dadada;
  }
  .zs .zs-items > li > span:nth-of-type(1),
  .hs .hs-items > li > span:nth-of-type(1),
  .qs .qs-items > li > span:nth-of-type(1) {
    display: inline-block;
    margin-left: 15px;
    color: #8a8a8a;
  }
  .zs .zs-items > li > span:nth-of-type(2),
  .hs .hs-items > li > span:nth-of-type(2),
  .qs .qs-items > li > span:nth-of-type(2) {
    display: inline-block;
    margin-left: 11px;
    color: #8a8a8a;
    margin-right: 17px;
  }
  .hs {
    border-bottom: 1px solid #d5d5d5;
  }
  .game-ssc-content-left-table > .btns {
    width: 207px;
    height: 33px;
    margin: 14px auto 13px auto;
  }
  .game-ssc-content-left-table > .btns a:nth-of-type(1) {
    display: inline-block;
    width: 93px;
    line-height: 33px;
    background-color: #f0c115;
    border-radius: 3px;
    color: #c1272d;
    font-size: 11px;
    font-weight: bold;
    border: 1px solid #efe2c7;
    margin-right: 9px;
    height: 33px;
    text-align: center;
  }
  .game-ssc-content-left-table > .btns a:nth-of-type(2) {
    display: inline-block;
    width: 92px;
    line-height: 33px;
    background-color: #bbbbbb;
    border-radius: 3px;
    color: #eeeeee;
    font-size: 11px;
    font-weight: bold;
    border: 1px solid #dedede;
    margin-right: 9px;
    height: 33px;
    text-align: center;
  }
  .game-ssc-content-right {
    margin-top: 13px;
    width: 209px;
    margin-left: 20px;
  }
  .game-ssc-content-right .tabs {
    height: 27px;
    width: 100%;
  }
  .game-ssc-content-right .tabs a {
    float: left;
    height: 100%;
    line-height: 27px;
    text-align: center;
    background-color: #bbbbbb;
    font-weight: bold;
    color: #ffffff;
    width: 50%;
  }
  .game-ssc-content-right .tabs a.now-hov {
    background-color: #a0936e;
    border-bottom: 1px solid #b5ab8b;
  }
  .periods-number {
    height: 20px;
    background-color: #a69871;
    font-size: 12px;
    line-height: 20px;
    padding-left: 13px;
    padding-right: 8px;
    color: #ffffff;
    font-weight: bold;
  }
  .periods-show {
    width: 100%;
    height: 672px;
    border: 1px dashed #d6d6d6;
    border-top: none;
    padding: 5px 18px 0 12px;
  }
  .periods-show li {
    margin-top: 7px;
  }
  .periods-show li > span:nth-of-type(1) {
    float: left;
    color: #777777;
    margin-right: 8px;
  }
  .periods-show li > span:nth-of-type(2) {
    float: left;
    color: #c82727;
  }
  .periods-show li > span:nth-of-type(3) {
    float: right;
    color: #777777;
    font-size: 12px;
  }
  .law-table {
    margin-top: 19px;
    padding-left: 27px;
    padding-bottom: 11px;
    background-color: #eeeeee;
  }
  .law-table .law-table-header {
    line-height: 44px;
    position: relative;
    padding-right: 14px;
  }
  .law-table .law-table-header > * {
    float: left;
  }
  .law-table .law-table-header > .select_wrapper {
    width: 73px;
    font-size: 10px;
  }
  .law-table .law-table-header > .btns {
    margin-left: 31px;
  }
  .law-table .law-table-header > .btns a {
    /*float: left;*/
    border-radius: 3px;
    text-align: center;
    display: inline-block;
    padding: 0 8px;
    height: 24px;
    background-color: #bbbbbb;
    color: #fff;
    line-height: 24px;
  }
  .law-table .law-table-header > .btns a.now-hov {
    background-color: #a79972;
  }
  .law-table .law-table-header > .shrink {
    float: right;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #646362;
    border-radius: 3px;
    margin-top: 11px;
  }
  .law-table .law-table-header > .shrink img {
    vertical-align: super;
  }
  .dalu-table {
    height: 92px;
    /*border: 1px solid #b3b3b3;*/
    border-radius: 3px;
    /*width: 799px;*/
  }
  .dalu-table > * {
    float: left;
  }
  .dalu-table .table-title {
    width: 29px;
    text-align: center;
    writing-mode: vertical-lr;
    line-height: 29px;
    font-size: 11px;
    color: #ffffff;
    height: 91px;
    background-color: #a99b73;
  }
  .dalu-table table {
    border-collapse:collapse;
    /*height: 87px;*/
  }
  .dalu-table table tr {}
  .dalu-table table tr td,
  .table tr td {
    border: 1px solid #888888;
    width: 14.5px;
    height: 14.5px;
    line-height: 14.5px;
    text-align: center;
  }
  .dalu-table table tr td > div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #0043ff;
    color: #fff;
  }
  /*------------------------------------*/
  .blue{
    background-color: #0043ff!important;
  }
  .red{
    background-color: #c82727!important;
  }
  .no_bg {
    background-color: rgba(0, 0, 0, 0)!important;
  }
  /*------------------------------------*/
  .tables {
    margin-top: 6px;
  }
  .tables > div {
    float: left;
  }
  .tables > .table > .table-title {
    float: left;
    width: 29px;
    text-align: center;
    writing-mode: vertical-lr;
    line-height: 29px;
    font-size: 11px;
    color: #ffffff;
    height: 91px;
    background-color: #a99b73;
  }
</style>

<style>
  /*todo: 打包之后不确定是否会被覆盖 如果被覆盖 需要添加important后缀*/
  .game-ssc-content-left-top ul > li:nth-of-type(2) .el-slider__bar {
    background: url("../../statics/img/scroll_bg.jpg") repeat-x 0 0;
  }
  .game-ssc-content-left-top ul > li:nth-of-type(2) .el-slider__button {
    width: 14px;
    height: 14px;
    background: url("../../statics/img/game_nav_is_official_ball.png") no-repeat 0 0;
    border: none;
    background-size: 100% 100%;
  }
  .periods-number .el-dropdown {
    float: right;
    font-size: 12px;
    color: #fff;
  }
  .periods-number .el-icon--right {
    margin-left: 0;
  }
  .select_wrapper .el-input--mini .el-input__inner {
    height: 23px;
    width: 73px;
    line-height: 23px;
  }
</style>
