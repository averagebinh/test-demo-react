import React from 'react';
class DisplayInfo extends React.Component {
  render() {
    //props => properties, tai san
    // destructuring array/object
    const { name, age } = this.props;
    return (
      <div>
        <div>My name's {name}</div>
        <div>My age's {age} years old</div>
      </div>
    );
  }
}
export default DisplayInfo;
