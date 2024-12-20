'use client';
import React from 'react';
import { Spacer } from '@nextui-org/react';
import 'aos/dist/aos.css';

const IndexContent = () => {
  return (


<div className="mx-auto px-4 pt-5"> 

    <div className=""> 
      {/* Section 1: Easy to Use */}
      <div className=" main-page-content-block">
        <h1 className="text-6xl mb-4 text-center headers-font" data-aos="fade-up-right">Easy to Use!</h1> 
        <div className=" main-page-content-block-body">
          <div className="main-page-content-block-body_text-block darker-block p-6" data-aos="fade-up-right">
            <span className="text-xl">
              Discover endless gaming fun with <span className="font-semibold text-highlight">Games Discord Bot</span>! Easily dive into a world of entertainment using simple commands. Our <span className="font-semibold text-highlight">user-friendly design</span> lets you explore hassle-free. Say goodbye to complicated setups and hello to easy, command-based gaming. Start your gaming adventure with just a few keystrokes!
            </span>
          </div>
          <div className="main-page-content-block-body_image-block"> 
            <img loading='lazy' data-aos="fade-up-left" src="/img/main_page/easy_to_use.webp" alt="Easy to use" className="custom-image" />
          </div>
        </div>
      </div>
    </div>

    <div className=""> 
      {/* Section 2: Unlimited and free */}
      <div className=" main-page-content-block">
        <h1 className="text-6xl mb-4 text-center headers-font" data-aos="fade-up-right">Unlimited and Free!</h1> 
        <div className=" main-page-content-block-body flex-reverse">
          <div className="main-page-content-block-body_text-block darker-block p-6" data-aos="fade-up-right">
            <span className="text-xl">
              Embark on a journey of <span className="font-semibold text-highlight">free gaming</span> with Games Bot! Explore classics like tic-tac-toe, chess, and more. Solve puzzles, engage in strategic battles, and experience <span className="font-semibold text-highlight">limitless fun</span> &ndash; all just a command away!
            </span>
          </div>
          <div className="main-page-content-block-body_image-block"> 
            <img loading='lazy' data-aos="fade-up-left" src="/img/main_page/games_combined.webp" alt="Easy to use" className="custom-image" />
          </div>
        </div>
      </div>
    </div>

       {/* Section 3: Play Together */}
      <div className=" main-page-content-block">
        <h1 className="text-6xl mb-4 text-center headers-font" data-aos="fade-up-right">Play Together!</h1> 
        <div className=" main-page-content-block-body">
          <div className="main-page-content-block-body_text-block darker-block p-6" data-aos="fade-up-right">
            <span className="text-xl">
            Games Bot isn&rsquo;t just for solo adventures; it&rsquo;s about the joy of <span className="font-semibold text-highlight">shared gaming experiences</span>! Dive into thrilling <span className="font-semibold text-highlight">multiplayer games</span>, inviting friends to join the fun. Whether teaming up for strategic battles or challenging each other in classic board games, Games Bot creates a platform for <span className="font-semibold text-highlight">shared enjoyment</span>. Invite friends, multiply the fun, and embark on <span className="font-semibold text-highlight">multiplayer adventures</span> together with Games Bot!
            </span>
          </div>
          <div className="main-page-content-block-body_image-block"> 
            <img loading='lazy' data-aos="fade-up-left" src="/img/main_page/play_together.webp" alt="Easy to use" className="custom-image" />
          </div>
        </div>
      </div>

           {/* Section 4: Unlock All Achievements */}
          <div className=" main-page-content-block">
        <h1 className="text-6xl mb-4 text-center headers-font" data-aos="fade-up-right">Unlock All Achievements!</h1> 
        <div className=" main-page-content-block-body">
          <div className="main-page-content-block-body_text-block darker-block p-6" data-aos="fade-up-right">
          <span className="text-xl">
              Embark on a journey of accomplishments with Games Bot! Unlock <span className="font-semibold text-highlight">secret and standard achievements</span>, showcasing your gaming prowess. Every victory and milestone becomes a badge of honor. Rise to the challenge, uncover <span className="font-semibold text-highlight">hidden feats</span>, and showcase your gaming prowess by unlocking all achievements!
            </span>
          </div>
          <div className="main-page-content-block-body_image-block"> 
            <img loading='lazy' data-aos="fade-up-left" src="/img/main_page/question_mark.svg" alt="Easy to use" className="custom-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexContent;
