import React from 'react';
import Logo from  '../asset/Logo.png';
import '../home/home.css';
import banner from '../asset/img.png';
import share from '../asset/share.png';

export default function Home({onSignInClick}) {
  return (
    <div className='home'>
      <div className='nav'>
        <div className='left'>
    <img src= {Logo} alt='formBot' className='Logo'/>
    <p>FormBot</p>
        </div>
        <div className='right'>
       <button className='sign' onClick={onSignInClick}>Sign in</button>
       <button className='Formbot-btn'>Create a FormBot </button>
        </div>
      </div>

      <div className='main'>
        <h1>Build advanced chatbots
        visually</h1>
        <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
        anywhere on your web/mobile apps and start collecting results like magic.</p>
        <button className='bot'>Create a FormBot  for free</button>
        <img src={banner} alt='banner' className='banner'></img>
      </div>

      <div className='footer'>
        <ul>
            <li className='lg'><img src={Logo} alt='logo' className='logo1'></img> <h1>FormBot</h1> </li>
             <li>Made with ❤️ by </li>
             <li className='line' > @cuvette</li>
        </ul>

        <ul>
            <li><h1>Product</h1> </li>
            <li className='line' >Status 
                <img src={share} alt='share'/>
            </li>
            <li className='line' >Documentation
            <img src={share} alt='share'/>
            </li>
            <li className='line' >Roadmap
            <img src={share} alt='share'/>
            </li>
            <li className='line' >Pricing</li>
        </ul>

        <ul>
            <li><h1>Community</h1></li>
            <li className='line' >Discord 
            <img src={share} alt='share'/>
            </li>
            <li className='line' >Github repository
            <img src={share} alt='share'/>
            </li>
            <li className='line' >Twitter
            <img src={share} alt='share'/>
            </li>
            <li className='line' >Linkedin
            <img src={share} alt='share'/>
            </li>
            <li className='line' >OSS Friends</li>
        </ul>

        <ul>
            <li><h1>Company</h1></li>
            <li className='line' >About</li>
            <li className='line' >Contact</li>
            <li className='line' >Terms of Service</li>
            <li className='line' >Privacy Policy</li>
        </ul>

      </div>

    </div>
  )
}
