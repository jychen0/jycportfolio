import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tabs from '../components/Tabs';
import '../assets/styles.css';

const About = () => {
  const messages = [
    "My birthday is November 19th!",
    "The USS Intrepid is my favorite museum in the world.",
    "The Lucid Air GT is my dream car.",
    "I turned 19 in South Korea watching the LoL 2023 Worlds Finals.",
    "I have a signed poster from the voice actor of Silco from the show Arcane.",
    "My favorite band is Against The Current.",
    "I have been to 9 different US states and 5 different countries.",
    "Some of my favorite book series are 'The Inheritence Games', 'Ranger's Apprentice', and 'Alex Rider'.",
    "Most recent movie I have watched: Sonic The Hedgehog 3.", 
    "I have a 3D printed version of Jhin's 'Whipser' from League of Legends.",
    "My Hogwarts house is Ravenclaw.",
    "My MBTI is ISTJ-T."
  ];

  const getRandomIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === currentMessageIndex || newIndex === previousMessageIndex);
    return newIndex;
  };

  const [previousMessageIndex, setPreviousMessageIndex] = useState(null); 
  const [currentMessageIndex, setCurrentMessageIndex] = useState(Math.floor(Math.random() * messages.length));
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100; 
  const deletingSpeed = 50; 
  const pause = 1500; 


  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    let typingTimeout;
  
    if (!isDeleting && displayedText !== currentMessage) {
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => currentMessage.slice(0, prev.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText !== '') {
      typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else if (!isDeleting && displayedText === currentMessage) {
      typingTimeout = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setPreviousMessageIndex(currentMessageIndex); 
      setCurrentMessageIndex(getRandomIndex());
    }
  
    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, currentMessageIndex, messages]);

  return (
    <>
      <Navbar />
      <section id="about"></section>
      <div className="about-container">
        <div className="about" id="about-page">
          <div className="about-col-1">
            <h1>About Me</h1>
            <img src={"/images/Me/user-1.jpg"}></img>
          </div>
          <div className="about-col-2">
            <p>Hi! My name is Jason Chen, and I'm a 20-year-old junior at Clark University. I am an aspiring Game Developer majoring in Interactive Media Design and Data Science. I was born in China but have lived in the greater Boston area since I was one year old. I started gaming at a young age with Pokemon Platinum but quickly realized it was much more than a hobby. Playing games and talking to other gamers showed me how games have the power to tell stories, create long-lasting bonds, and build communities. 
            <br /><br />
            I started picking up coding in high school knowing it was one of the most important parts of developing a game. I have since learned multiple coding languages and have hands-on experience with engines like Unity and Unreal Engine for game development. With these skills, I have worked on a few small games and projects to challenge and evolve my skills.
            <br /><br />
            Outside of my education and career goals, I'm a transportation enthusiast from cars to trains to planes. I love watching esports tournaments of my favorite competitive games and even attending the events if I can. I'm always excited to collaborate on new projects, game development related or not, and to chat with new people!
            <br />
            📧 Feel free to connect and reach out to me on <a href="https://www.linkedin.com/in/jason-yuzheng-chen/" target="_blank">LinkedIn</a>
            </p>
            <br />
            <p className="fun-facts">Fun Facts: {displayedText}<span className="cursor">|</span></p>
            <Tabs />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
