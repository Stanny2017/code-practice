/**
 * 将一个 html 字符串转换为 vdom object
 * 
 * vdom 结构:
 * {tagName, props, children }
 * 
 * solution:
 * 使用状态机
 * 
 */

const htmlString = `
    <div class="root" data-id="1">
        <div class="children-1">
            <span class="span-children">i'm a span tag</span>
        </div>
        <div class="children-2"> div children 2</div>
        <div class="children-3"> div children 3 </div>
    </div>`;


class DomStringParser {
    constructor() {
        this.virtualDom = {};
        this.inFinished = false;

        this.stack = []
    }

    parse(htmlString) {
        for (let character of htmlString) {
            this.state = this.state(character)
        }
    }

    state(character) {
        if (character === ' ') {
            return this.state;
        } else if (character === '<') {
            return this.tagStart;
        }
    }

    tagStart(character) {
        if (character !== ' ') {
            if (this.virtualDom.tagName) {
                this.virtualDom.tagName = '';
            } else {
                this.virtualDom.tagName += character;
            }
        }else if(character===' '){
            return this.propsStart;
        }
    }

    propsStart(){

    }





}
