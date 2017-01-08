/**
 * Created by johnny on 04/01/2017.
 */
import React, {Component, PropTypes} from 'react'

require('../css/App.css')

const titles = ['c','p','p','/','7','8','9','*','4','5','6','-','1','2','3','+','0','.','=']
const highlightIndexes = [3,7,11,15,18]

export default class App extends Component {

    render() {
        var components = []
        for (var i=0;i<titles.length;i++){
            var component
            if (titles[i] === '0') {
                component = <button className="zeroButton">0</button>
            }else {
                component = <button className="button">{titles[i]}</button>
            }
            if (highlightIndexes.includes(i)){
                component = <button className="button" style={{backgroundColor: 'coral'}}>{titles[i]}</button>
            }
            components.push(component)
        }
        return (
            <div className="iphone">
                <div className="screen">
                    <div className="topContainer">
                        <div className="bigInput">88</div>
                        <div className="smallInput">1+88</div>
                    </div>
                    <div className="bottomContainer">
                        {/*{titles.map(function(v){*/}
                            {/*return <button className="button">{v}</button>*/}
                        {/*})}*/}
                        {components}
                    </div>
                </div>
            </div>
        );
    }
}