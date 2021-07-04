import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {JSON.stringify(this.props.emotions.result.emotion.document)}
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions

                 this.props.emotions.result.emotion.document.emotion && 
                  Object.keys(this.props.emotions.result.emotion.document.emotion).map(function (element,value) {
                     return <tr>
                       <td>{element}</td>
                       <td>{this.props.emotions.result.emotion.document.emotion[element]}</td>
                     </tr>;
                  })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
