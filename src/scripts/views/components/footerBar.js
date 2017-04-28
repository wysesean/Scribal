import React from 'react'

var FooterBar = React.createClass({
	render: function() {
		return(
			<footer className="page-footer">
			    <div className="container">
			      <div className="row">
			        <div className="col l12 s12">
			        <center>
			          <h6 className="white-text">Our mission at Scribal is to provide a free education that is both accessible and consumable to anyone.</h6>
					</center>
			        </div>
			      </div>
			    </div>
			    <div className="footer-copyright makemegray">
				    <div className="row makemewider">
				      	<a className="col s3" href="#about">About</a>
				      	<a className="col s3" href="#contact">Contact</a>
				      	<a className="col s3" href="#hireMe">Careers</a>
				      	<a className="col s3" href="https://www.github.com/wysesean">Made by Sean Wyse</a>
				    </div>
			    </div>
			  </footer>
		) 
	}
})

export default FooterBar