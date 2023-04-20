import React, { Component, memo } from 'react';

// class Try extends Component {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     );
//   }
// }

const Try = memo(
  ({tryInfo}) => {
    return(
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
); 
Try.displayName = 'Try';

export default Try;