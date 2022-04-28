import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
	<footer className="container-fluid border-top">
		<div className="row">
			<div className="col-12 col-md-7 d-flex">
					<p className="ml-4">
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
					The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'
				</p>
			</div>
			<div className="col-12 col-md-5 d-flex justify-content-center align-items-center">
			</div>
		</div>
		<div className="row my-4">
			<div className="col-12 col-md-5 footer-links">
				<ul className="list-group list-group-horizontal">
					<li className="list-group-item bg-transparent border-0">
						<Link to="/about-us">About Us</Link>
					</li>
					<li className="list-group-item bg-transparent border-0">
						<Link to="/products">Products</Link>
					</li>
					<li className="list-group-item bg-transparent border-0">
						<Link to="/contact-us">Contact Us</Link>
					</li>
				</ul>
			</div>
		</div>
		<div className="footer-divider" />

		<div className="d-flex company-address my-4">
			<p>Jon Doe (Marketing Manager) Plant A Tree </p>
			<p> - +44555666777</p>
		</div>
	</footer>
    )
}