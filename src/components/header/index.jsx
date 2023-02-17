import React from 'react';

const Header = () => {
	return (
		<header className='header'>
			<div className='container'>
				<div className='header__inner'>
					<div className='header__logo'>
						<h4 className='header__logo-title'>React shop</h4>
					</div>
					<nav className='header__menu'>
						<ul className='header__list'>
							<li className='header__item'>
								<a className='header__link' href='#!'>Repo</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header;