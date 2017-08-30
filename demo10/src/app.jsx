import React, {Component} from 'React';
import { NavLink } from 'react-router-dom'


const element = <div> 很好 </div>;



class HomeContent extends Component {
	render(){
		return element;
	}
}


React.render(
	<div>
		<HomeContent />
		<NavLink to="/about">About</NavLink>
	</div>,
  document.getElementById('root')
);
