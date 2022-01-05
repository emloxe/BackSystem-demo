<template>
  <el-card class="box-card">
    文档地址：<a href="https://github.com/nuysoft/Mock/wiki/Syntax-Specification"
      >https://github.com/nuysoft/Mock/wiki/Syntax-Specification</a
    >
    <h1>语法规范</h1>

    <p>Mock.js 的语法规范包括两部分：</p>

    <ol>
      <li>数据模板定义规范（Data Template Definition，DTD）</li>
      <li>数据占位符定义规范（Data Placeholder Definition，DPD）</li>
    </ol>

    <h2>数据模板定义规范 DTD</h2>

    <p><strong>数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：</strong></p>

    <p><code>js // 属性名 name // 生成规则 rule // 属性值 value 'name|rule': value </code></p>

    <p><strong>注意：</strong></p>

    <ul>
      <li><em>属性名</em> 和 <em>生成规则</em> 之间用竖线 <code>|</code> 分隔。</li>
      <li><em>生成规则</em> 是可选的。</li>
      <li>
        <em>生成规则</em> 有 7 种格式：
        <ol>
          <li><code>'name|min-max': value</code></li>
          <li><code>'name|count': value</code></li>
          <li><code>'name|min-max.dmin-dmax': value</code></li>
          <li><code>'name|min-max.dcount': value</code></li>
          <li><code>'name|count.dmin-dmax': value</code></li>
          <li><code>'name|count.dcount': value</code></li>
          <li><code>'name|+step': value</code></li>
        </ol>
      </li>
      <li>
        <strong><em>生成规则</em> 的 含义 需要依赖 <em>属性值的类型</em> 才能确定。</strong>
      </li>
      <li><em>属性值</em> 中可以含有 <code>@占位符</code>。</li>
      <li><em>属性值</em> 还指定了最终值的初始值和类型。</li>
    </ul>

    <!-- 感谢 @麦少 同学对 Mock.js 语法的整理和分析，才有了这版相对清晰的语法文档。 -->

    <p><strong>生成规则和示例：</strong></p>

    <h3>1. 属性值是字符串 <strong>String</strong></h3>

    <ol>
      <li>
        <p><code>'name|min-max': string</code></p>

        <p>
          通过重复 <code>string</code> 生成一个字符串，重复次数大于等于 <code>min</code>，小于等于
          <code>max</code>。
        </p>
      </li>
      <li>
        <p><code>'name|count': string</code></p>

        <p>通过重复 <code>string</code> 生成一个字符串，重复次数等于 <code>count</code>。</p>
      </li>
    </ol>

    <h3>2. 属性值是数字 <strong>Number</strong></h3>

    <ol>
      <li>
        <p><code>'name|+1': number</code></p>

        <p>属性值自动加 1，初始值为 <code>number</code>。</p>
      </li>
      <li>
        <p><code>'name|min-max': number</code></p>

        <p>
          生成一个大于等于 <code>min</code>、小于等于 <code>max</code> 的整数，属性值
          <code>number</code> 只是用来确定类型。
        </p>
      </li>
      <li>
        <p><code>'name|min-max.dmin-dmax': number</code></p>

        <p>
          生成一个浮点数，整数部分大于等于 <code>min</code>、小于等于 <code>max</code>，小数部分保留
          <code>dmin</code> 到 <code>dmax</code> 位。
        </p>
      </li>
    </ol>

    <p>
      <code
        >js Mock.mock({ 'number1|1-100.1-10': 1, 'number2|123.1-10': 1, 'number3|123.3': 1,
        'number4|123.10': 1.123 }) // =&gt; { "number1": 12.92, "number2": 123.51, "number3":
        123.777, "number4": 123.1231091814 }
      </code>
    </p>

    <h3>3. 属性值是布尔型 <strong>Boolean</strong></h3>

    <ol>
      <li>
        <p><code>'name|1': boolean</code></p>

        <p>随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。</p>
      </li>
      <li>
        <p><code>'name|min-max': value</code></p>

        <p>
          随机生成一个布尔值，值为 <code>value</code> 的概率是 <code>min / (min + max)</code>，值为
          <code>!value</code> 的概率是 <code>max / (min + max)</code>。
        </p>
      </li>
    </ol>

    <h3>4. 属性值是对象 <strong>Object</strong></h3>

    <ol>
      <li>
        <p><code>'name|count': object</code></p>

        <p>从属性值 <code>object</code> 中随机选取 <code>count</code> 个属性。</p>
      </li>
      <li>
        <p><code>'name|min-max': object</code></p>

        <p>从属性值 <code>object</code> 中随机选取 <code>min</code> 到 <code>max</code> 个属性。</p>
      </li>
    </ol>

    <h3>5. 属性值是数组 <strong>Array</strong></h3>

    <ol>
      <li>
        <p><code>'name|1': array</code></p>

        <p>从属性值 <code>array</code> 中随机选取 1 个元素，作为最终值。</p>
      </li>
      <li>
        <p><code>'name|+1': array</code></p>

        <p>从属性值 <code>array</code> 中顺序选取 1 个元素，作为最终值。</p>
      </li>
      <li>
        <p><code>'name|min-max': array</code></p>

        <p>
          通过重复属性值 <code>array</code> 生成一个新数组，重复次数大于等于
          <code>min</code>，小于等于 <code>max</code>。
        </p>
      </li>
      <li>
        <p><code>'name|count': array</code></p>

        <p>通过重复属性值 <code>array</code> 生成一个新数组，重复次数为 <code>count</code>。</p>
      </li>
    </ol>

    <h3>6. 属性值是函数 <strong>Function</strong></h3>

    <ol>
      <li>
        <p><code>'name': function</code></p>

        <p>
          执行函数 <code>function</code>，取其返回值作为最终的属性值，函数的上下文为属性
          <code>'name'</code> 所在的对象。
        </p>
      </li>
    </ol>

    <h3>7. 属性值是正则表达式 <strong>RegExp</strong></h3>

    <ol>
      <li>
        <p><code>'name': regexp</code></p>

        <p>
          根据正则表达式
          <code>regexp</code> 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。
        </p>

        <p>
          <code
            >js Mock.mock({ 'regexp1': /[a-z][A-Z][0-9]/, 'regexp2': /\w\W\s\S\d\D/, 'regexp3':
            /\d{5,10}/ }) // =&gt; { "regexp1": "pJ7", "regexp2": "F)\fp1G", "regexp3": "561659409"
            }
          </code>
        </p>
      </li>
    </ol>

    <h2>数据占位符定义规范 DPD</h2>

    <p><em>占位符</em> 只是在属性值字符串中占个位置，并不出现在最终的属性值中。</p>

    <p><em>占位符</em> 的格式为：</p>

    <p><code> @占位符 @占位符(参数 [, 参数]) </code></p>

    <p><strong>注意：</strong></p>

    <ol>
      <li>用 <code>@</code> 来标识其后的字符串是 <em>占位符</em>。</li>
      <li><em>占位符</em> 引用的是 <code>Mock.Random</code> 中的方法。</li>
      <li>通过 <code>Mock.Random.extend()</code> 来扩展自定义占位符。</li>
      <li><em>占位符</em> 也可以引用 <em>数据模板</em> 中的属性。</li>
      <li><em>占位符</em> 会优先引用 <em>数据模板</em> 中的属性。</li>
      <li><em>占位符</em> 支持 <em>相对路径</em> 和 <em>绝对路径</em>。</li>
    </ol>

    <p>
      <code>
        js Mock.mock({ name: { first: '@FIRST', middle: '@FIRST', last: '@LAST', full: '@first
        @middle @last' } }) // =&gt; { "name": { "first": "Charles", "middle": "Brenda", "last":
        "Lopez", "full": "Charles Brenda Lopez" } }
      </code>
    </p>
  </el-card>
</template>

<script>
export default {};
</script>

<style></style>
