<template>
  <el-card class="box-card article">
    <div class="markdown-body">
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

      <p>
        <strong>数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：</strong>
      </p>

      <p>
        <code>js // 属性名 name // 生成规则 rule // 属性值 value 'name|rule': value </code>
      </p>

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
            生成一个浮点数，整数部分大于等于 <code>min</code>、小于等于
            <code>max</code>，小数部分保留 <code>dmin</code> 到 <code>dmax</code> 位。
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
            随机生成一个布尔值，值为 <code>value</code> 的概率是
            <code>min / (min + max)</code>，值为 <code>!value</code> 的概率是
            <code>max / (min + max)</code>。
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

          <p>
            从属性值 <code>object</code> 中随机选取 <code>min</code> 到 <code>max</code> 个属性。
          </p>
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
            执行函数
            <code>function</code>，取其返回值作为最终的属性值，函数的上下文为属性
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
            <code>regexp</code>
            反向生成可以匹配它的字符串。用于生成自定义格式的字符串。
          </p>

          <p>
            <code
              >js Mock.mock({ 'regexp1': /[a-z][A-Z][0-9]/, 'regexp2': /\w\W\s\S\d\D/, 'regexp3':
              /\d{5,10}/ }) // =&gt; { "regexp1": "pJ7", "regexp2": "F)\fp1G", "regexp3":
              "561659409" }
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
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style>
@charset "utf-8";
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
}

.markdown-body::before {
  display: table;
  content: '';
}

.markdown-body::after {
  display: table;
  clear: both;
  content: '';
}

.markdown-body > *:first-child {
  margin-top: 0 !important;
}

.markdown-body > *:last-child {
  margin-bottom: 0 !important;
}

.markdown-body a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.markdown-body .absent {
  color: var(--color-danger-fg);
}

.markdown-body .anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}

.markdown-body .anchor:focus {
  outline: none;
}

.markdown-body p,
.markdown-body blockquote,
.markdown-body ul,
.markdown-body ol,
.markdown-body dl,
.markdown-body table,
.markdown-body pre,
.markdown-body details {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: var(--color-border-default);
  border: 0;
}

.markdown-body blockquote {
  padding: 0 1em;
  color: var(--color-fg-muted);
  border-left: 0.25em solid var(--color-border-default);
}

.markdown-body blockquote > :first-child {
  margin-top: 0;
}

.markdown-body blockquote > :last-child {
  margin-bottom: 0;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 .octicon-link,
.markdown-body h2 .octicon-link,
.markdown-body h3 .octicon-link,
.markdown-body h4 .octicon-link,
.markdown-body h5 .octicon-link,
.markdown-body h6 .octicon-link {
  color: var(--color-fg-default);
  vertical-align: middle;
  visibility: hidden;
}

.markdown-body h1:hover .anchor,
.markdown-body h2:hover .anchor,
.markdown-body h3:hover .anchor,
.markdown-body h4:hover .anchor,
.markdown-body h5:hover .anchor,
.markdown-body h6:hover .anchor {
  text-decoration: none;
}

.markdown-body h1:hover .anchor .octicon-link,
.markdown-body h2:hover .anchor .octicon-link,
.markdown-body h3:hover .anchor .octicon-link,
.markdown-body h4:hover .anchor .octicon-link,
.markdown-body h5:hover .anchor .octicon-link,
.markdown-body h6:hover .anchor .octicon-link {
  visibility: visible;
}

.markdown-body h1 tt,
.markdown-body h1 code,
.markdown-body h2 tt,
.markdown-body h2 code,
.markdown-body h3 tt,
.markdown-body h3 code,
.markdown-body h4 tt,
.markdown-body h4 code,
.markdown-body h5 tt,
.markdown-body h5 code,
.markdown-body h6 tt,
.markdown-body h6 code {
  padding: 0 0.2em;
  font-size: inherit;
}

.markdown-body h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid var(--color-border-muted);
}

.markdown-body h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid var(--color-border-muted);
}

.markdown-body h3 {
  font-size: 1.25em;
}

.markdown-body h4 {
  font-size: 1em;
}

.markdown-body h5 {
  font-size: 0.875em;
}

.markdown-body h6 {
  font-size: 0.85em;
  color: var(--color-fg-muted);
}

.markdown-body summary h1,
.markdown-body summary h2,
.markdown-body summary h3,
.markdown-body summary h4,
.markdown-body summary h5,
.markdown-body summary h6 {
  display: inline-block;
}

.markdown-body summary h1 .anchor,
.markdown-body summary h2 .anchor,
.markdown-body summary h3 .anchor,
.markdown-body summary h4 .anchor,
.markdown-body summary h5 .anchor,
.markdown-body summary h6 .anchor {
  margin-left: -40px;
}

.markdown-body summary h1,
.markdown-body summary h2 {
  padding-bottom: 0;
  border-bottom: 0;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 2em;
}

.markdown-body ul.no-list,
.markdown-body ol.no-list {
  padding: 0;
  list-style-type: none;
}

.markdown-body ol[type='1'] {
  list-style-type: decimal;
}

.markdown-body ol[type='a'] {
  list-style-type: lower-alpha;
}

.markdown-body ol[type='i'] {
  list-style-type: lower-roman;
}

.markdown-body div > ol:not([type]) {
  list-style-type: decimal;
}

.markdown-body ul ul,
.markdown-body ul ol,
.markdown-body ol ol,
.markdown-body ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

.markdown-body li > p {
  margin-top: 16px;
}

.markdown-body li + li {
  margin-top: 0.25em;
}

.markdown-body dl {
  padding: 0;
}

.markdown-body dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}

.markdown-body dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown-body table {
  display: block;
  width: 100%;
  width: max-content;
  max-width: 100%;
  overflow: auto;
}

.markdown-body table th {
  font-weight: 600;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid var(--color-border-default);
}

.markdown-body table tr {
  background-color: var(--color-canvas-default);
  border-top: 1px solid var(--color-border-muted);
}

.markdown-body table tr:nth-child(2n) {
  background-color: var(--color-canvas-subtle);
}

.markdown-body table img {
  background-color: transparent;
}

.markdown-body img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: var(--color-canvas-default);
}

.markdown-body img[align='right'] {
  padding-left: 20px;
}

.markdown-body img[align='left'] {
  padding-right: 20px;
}

.markdown-body .emoji {
  max-width: none;
  vertical-align: text-top;
  background-color: transparent;
}

.markdown-body span.frame {
  display: block;
  overflow: hidden;
}

.markdown-body span.frame > span {
  display: block;
  float: left;
  width: auto;
  padding: 7px;
  margin: 13px 0 0;
  overflow: hidden;
  border: 1px solid var(--color-border-default);
}

.markdown-body span.frame span img {
  display: block;
  float: left;
}

.markdown-body span.frame span span {
  display: block;
  padding: 5px 0 0;
  clear: both;
  color: var(--color-fg-default);
}

.markdown-body span.align-center {
  display: block;
  overflow: hidden;
  clear: both;
}

.markdown-body span.align-center > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: center;
}

.markdown-body span.align-center span img {
  margin: 0 auto;
  text-align: center;
}

.markdown-body span.align-right {
  display: block;
  overflow: hidden;
  clear: both;
}

.markdown-body span.align-right > span {
  display: block;
  margin: 13px 0 0;
  overflow: hidden;
  text-align: right;
}

.markdown-body span.align-right span img {
  margin: 0;
  text-align: right;
}

.markdown-body span.float-left {
  display: block;
  float: left;
  margin-right: 13px;
  overflow: hidden;
}

.markdown-body span.float-left span {
  margin: 13px 0 0;
}

.markdown-body span.float-right {
  display: block;
  float: right;
  margin-left: 13px;
  overflow: hidden;
}

.markdown-body span.float-right > span {
  display: block;
  margin: 13px auto 0;
  overflow: hidden;
  text-align: right;
}

.markdown-body code,
.markdown-body tt {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: var(--color-neutral-muted);
  border-radius: 6px;
}

.markdown-body code br,
.markdown-body tt br {
  display: none;
}

.markdown-body del code {
  text-decoration: inherit;
}

.markdown-body samp {
  font-size: 85%;
}

.markdown-body pre {
  word-wrap: normal;
}

.markdown-body pre code {
  font-size: 100%;
}

.markdown-body pre > code {
  padding: 0;
  margin: 0;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.markdown-body .highlight {
  margin-bottom: 16px;
}

.markdown-body .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

.markdown-body .highlight pre,
.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: var(--color-canvas-subtle);
  border-radius: 6px;
}

.markdown-body pre code,
.markdown-body pre tt {
  display: inline;
  max-width: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

.markdown-body .csv-data td,
.markdown-body .csv-data th {
  padding: 5px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  white-space: nowrap;
}

.markdown-body .csv-data .blob-num {
  padding: 10px 8px 9px;
  text-align: right;
  background: var(--color-canvas-default);
  border: 0;
}

.markdown-body .csv-data tr {
  border-top: 0;
}

.markdown-body .csv-data th {
  font-weight: 600;
  background: var(--color-canvas-subtle);
  border-top: 0;
}

.markdown-body [data-footnote-ref]::before {
  content: '[';
}

.markdown-body [data-footnote-ref]::after {
  content: ']';
}

.markdown-body .footnotes {
  font-size: 12px;
  color: var(--color-fg-muted);
  border-top: 1px solid var(--color-border-default);
}

.markdown-body .footnotes ol {
  padding-left: 16px;
}

.markdown-body .footnotes li {
  position: relative;
}

.markdown-body .footnotes li:target::before {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -24px;
  pointer-events: none;
  content: '';
  border: 2px solid var(--color-accent-emphasis);
  border-radius: 6px;
}

.markdown-body .footnotes li:target {
  color: var(--color-fg-default);
}

.markdown-body .footnotes .data-footnote-backref g-emoji {
  font-family: monospace;
}
</style>
