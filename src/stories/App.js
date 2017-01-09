/**
 * Created by johnny on 04/01/2017.
 */
import React, {Component, PropTypes} from 'react'

require('../css/App.css')

const titles = ['c','c1','c2','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','=']
const highlightIndexes = [3,7,11,15,18]
const limitErrorDescription = 'over flow'

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            bigInput: '0',
            smallInput: '0',
            bigInputShouldRestart: true,
            smallInputShouldRestart: true,
        }
        this.ast = []
    }

    handleOperateBtn = (e) => {
        const inputValue = e.target.innerHTML
        var shouldRestart = this.state.bigInputShouldRestart
        if (shouldRestart == true) {
            return
        }
        // if (this.checkInputLimit()) {
        //     return
        // }
        this.ast.push(parseFloat(this.state.bigInput))
        switch (inputValue) {
            case '+':
            case '-':
            case '*':
            case '/':
                shouldRestart = true
                this.ast.push(inputValue)
                break
            case '=':
                shouldRestart = true
                const smallInput = this.state.smallInput + inputValue
                this.setState({smallInput: smallInput, bigInputShouldRestart: shouldRestart})
                this.startCaculate()
                return
            default:
                break
        }
        const smallInput = this.state.smallInput + inputValue
        this.setState({smallInput: smallInput, bigInputShouldRestart: shouldRestart})
    }

    handleNumberBtn = (e) => {
        const inputValue = e.target.innerHTML
        if (inputValue == 'c' || inputValue == 'c1' || inputValue == 'c2') {
            this.ast = []
            this.setState({bigInput: '0', smallInput: '0', bigInputShouldRestart: true, smallInputShouldRestart: true})
            return
        }
        if (this.state.bigInput == '0' && inputValue == '0') {
            return
        }
        if (this.checkInputLimit()) {
            return
        }
        var wholeNewValue
        if (this.state.bigInputShouldRestart) {
            wholeNewValue = inputValue
        }else {
            wholeNewValue = this.state.bigInput + inputValue
        }
        var smallInput
        if (this.state.smallInputShouldRestart){
            smallInput = inputValue
        }else {
            smallInput = this.state.smallInput + inputValue
        }
        this.setState({bigInput: wholeNewValue, smallInput: smallInput, bigInputShouldRestart: false, smallInputShouldRestart: false})
    }

    checkInputLimit = () => {
        const  bigInputLength = this.state.bigInput.length
        const smallInputLength = this.state.smallInput.length
        if (!this.state.bigInputShouldRestart && bigInputLength > 8 || smallInputLength > 17) {
            this.setState({bigInput: '0', smallInput: limitErrorDescription, bigInputShouldRestart: true, smallInputShouldRestart: true})
            return true
        }
        return false
    }

    startCaculate = () => {
        console.log(this.ast)
        const ast = this.ast
        var result = this.caculateInArray(ast)
        var resultString = parseFloat(result.toFixed(2)).toString();
        if (resultString.length > 9) {
            this.setState({bigInput: '0', smallInput: limitErrorDescription, bigInputShouldRestart: true, smallInputShouldRestart: true})
            return
        }
        this.setState({bigInput: resultString, bigInputShouldRestart: true, smallInputShouldRestart: true})
    }

    caculateInArray = (arr) => {
        if (arr.length === 1) {
            return arr.pop()
        }
        var copyArr = arr
        var value
        var index
        // find * or / first
        for (var i=0; i<arr.length;i++){
            if (arr[i] == '*') {
                value = arr[i-1] * arr[i+1]
                index = i
                break
            }
            if (arr[i] == '/') {
                value = arr[i-1] / arr[i+1]
                index = i
                break
            }
        }
        if (value) {
            copyArr.splice(index-1,3,value)
            return this.caculateInArray(copyArr)
        }
        // * or / not found, then + or -
        for (var i=0; i<arr.length;i++){
            if (arr[i] == '+') {
                value = arr[i-1] + arr[i+1]
                index = i
            }
            if (arr[i] == '-') {
                value = arr[i-1] - arr[i+1]
                index = i
            }
        }
        if (value) {
            copyArr.splice(index-1,3,value)
            return this.caculateInArray(copyArr)
        }
    }

    render() {
        var components = []
        for (var i=0;i<titles.length;i++){
            var component
            if (titles[i] === '0') {
                component = <button className="zeroButton" onClick={this.handleNumberBtn} id='0'>0</button>
            }else {
                component = <button className="button" onClick={this.handleNumberBtn} id={titles[i]}>{titles[i]}</button>
            }
            if (highlightIndexes.includes(i)){
                component = <button className="button" style={{backgroundColor: 'coral'}} onClick={this.handleOperateBtn} id={titles[i]}>{titles[i]}</button>
            }
            components.push(component)
        }
        return (
            <div className="iphone">
                <div className="screen">
                    <div className="topContainer">
                        <div className="bigInput">{this.state.bigInput}</div>
                        <div className="smallInput">{this.state.smallInput}</div>
                    </div>
                    <div className="bottomContainer">
                        {components}
                    </div>
                </div>
            </div>
        );
    }
}