
const TIME = 30
const CODE = {
    style: [
        `/*
* Inspired by http://strml.net/
* 你好，很高兴认识你 (´・ω・)ﾉ
* 你是在准备简历吗？真巧我也是哈\(\′\・\ω\・\`\)
* 那我们一起来写一份简历吧！(ง •̀_•́)ง
*/
/* 首先给所有元素加上过渡效果 */
* {
    transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
    color: rgb(222,222,222); background: rgb(0,43,54);
}
/* 文字离边框太近了 */
.styleEditor {
    padding: .5em;
    border: 1px solid;
    margin: .5em;
    overflow: auto;
    width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }
/* 加点 3D 效果呗 */
html{
    perspective: 1000px;
}
.styleEditor {
    position: fixed; left: 0; top: 0;
    -webkit-transition: none;
    transition: none;
    -webkit-transform: rotateY(10deg) translateZ(-100px) ;
    transform: rotateY(10deg) translateZ(-100px) ;
}
/* 接下来我给自己准备一个编辑器 */
.resumeEditor {
    position: fixed; right: 0; top: 0;
    padding: .5em;  margin: .5em;
    width: 48vw; height: 90vh;
    border: 1px solid;
    background: white; color: #222;
    overflow: auto;
}
 /* 好了，我开始写简历了 */
`, `
/* 这个简历好像差点什么
* 对了，这是 Markdown 格式的，我们要把它转换成HTML格式的
* 简单，看我的↑↑↓↓←→←→BA
*/
`, `
/* 再对 HTML 加点样式 */
.resumeEditor{
    padding: 2em;
}
.resumeEditor h2{
    display: inline-block;
    border-bottom: 1px solid;
    margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
    list-style: none;
}
.resumeEditor ul> li::before{
    content: '•';
    margin-right: .5em;
}
.resumeEditor ol {
    counter-reset: section;
}
.resumeEditor ol li::before {
    counter-increment: section;
    content: counters(section, ".") " ";
    margin-right: .5em;
}
.resumeEditor blockquote {
    margin: 1em;
    padding: .5em;
    background: #ddd;
}`],
    markdown: `
  唐菲
  ----
  前端工程师
  技能
  ----
  * HTML
  * CSS
  * Javascript
  * Vue
  * Node
  ----
  链接
  ----
  * [GitHub](https://github.com/wx85745997)
  * [我的博客](http://blog.tangfei.me/)
  > 如果你对我的这个简历有兴趣欢迎Start或Fork
   [我的项目](https://github.com/wx85745997/resume)
`
}


class Resume {
    constructor(code, time) {
        this.style = code.style
        this.markdown = code.markdown
        this.time = time
        this.styleCode = ''
    }

    showStyle(dom, css) {
        return new Promise((resolve, reject) => {
            let i = 0
            let $dom = document.querySelector(`#${dom}`)
            let $style = document.querySelector(`#style`)
            let clock = setInterval(() => {
                this.styleCode += css.substring(i, i + 1)
                let preCode = css.substring(i, i + 1)
                $dom.innerHTML = Prism.highlight(this.styleCode, Prism.languages.css)
                $style.innerHTML = '<style>' + this.styleCode + '</style>'
                i++
                if (preCode === '\n' || preCode === '}' || preCode === ';') {
                    setTimeout(() => {
                        $dom.scrollTop = $dom.scrollHeight + 500
                    }, this.time + 10)
                }
                if (i > css.length - 1) {
                    clearInterval(clock)
                    resolve()
                }
            }, this.time)
        })
    }

    showResume(dom, markdown) {
        return new Promise((resolve, reject) => {
            let i = 0
            let $dom = document.querySelector(`#${dom}`)
            let text = ''
            let clock = setInterval(() => {
                text += markdown.substring(i, i + 1)
                $dom.innerHTML = text
                i++;
                if (i > markdown.length - 1) {
                    clearInterval(clock)
                    resolve()
                }
            }, this.time)
        })
    }

    showResumeHtml(dom, markdown) {
        return new Promise((resolve, reject) => {
            let $dom = document.querySelector(`#${dom}`)
            $dom.style.opacity = 0
            setTimeout(() => {
                $dom.innerHTML = marked(this.markdown)
                $dom.style.opacity = 1
                $dom.style.whiteSpace = 'normal'
                resolve()
            }, 500)
        })
    }

    async start() {
        await this.showStyle('styleCode', this.style[0])
        await this.showResume('resume', this.markdown)
        await this.showStyle('styleCode', this.style[1])
        await this.showResumeHtml('resume', this.markdown)
        await this.showStyle('styleCode', this.style[2])
    }
}


var myResume = new Resume(CODE, TIME)
myResume.start()


