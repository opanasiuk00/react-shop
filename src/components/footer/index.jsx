import React from 'react';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__inner'>
					<div className='footer__copyright'>
						<h4 className='footer__copyright-title'>React shop</h4>
					</div>
					<nav className='footer__menu'>
						<ul className='footer__list'>
							<li className='footer__item'>
								<a className='footer__link' href='#!'>Repo</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	)
}

export default Footer;