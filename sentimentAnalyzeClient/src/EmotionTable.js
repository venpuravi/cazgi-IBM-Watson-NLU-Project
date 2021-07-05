import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
       
          <table className="table table-bordered">
            <tbody>
            {
                Object.keys(this.props.emotions.result.emotion.document.emotion).map(function (element,value) {
                     return <tr>
                       <td>{element}</td>
                       <td>{this.props.emotions.result.emotion.document.emotion[element]}</td>
                     </tr>;

                
            },this)
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
