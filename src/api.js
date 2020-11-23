// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
  players: [
    {
      id: 1,
      heading: `Richard`,
      subHeading: `HIIT`,
      body: `Not just another personal trainer, Richard Hart brings a diverse wealth of knowledge to every class that he teaches. With over 8 years of experience and member of elite running club Track Mafia, don’t let Richard’s cool and calm personality trick you into thinking you will get away with an easy ride. Combining strength and cardio exercises to one of the best playlists featuring hip hop, d&b and jungle, you will reach new levels with every class that you attend.`,
      image: require("./img/AS-Richard-2-2000x1472.jpg?min=320,max=1400,steps=6")
    },
    {
      id: 2,
      heading: `Annie K`,
      subHeading: `Cycle`,
      body: `One of our Another_Space originals, Annie Kitchen, has been part of our family/journey since the very beginning. Starting in the Cycle_Space and now crossing over into the HIIT_Space Annie combines her stamina from the bike into one intense workout in the HIIT_Studio. Chatty and enthusiastic, Annie will make sure she keeps you on track with your goals to get you fighting fit and become the best version of yourself.`,
      image: require("./img/AS2-Annie-K-3-2000x1472.jpg?min=320,max=1400,steps=6")
    },
    {
      id: 3,
      heading: `Mark`,
      subHeading: `Cycle`,
      body: `Good enough for the likes of Beyonce and Taylor Swift, Mark is a professional choreographer known for his dynamic and athletic style of training. His commitment to music will keep you cycling to the beat and will leave you feeling empowered. Watch out for his double time though, it’s intense to say the least!`,
      image: require("./img/AS2-Mark-2-2000x1472.jpg?min=320,max=1400,steps=6")
    },
    {
      id: 4,
      heading: `Jamie`,
      subHeading: `HIIT`,
      body: `Authentically trained in traditional Muay Thai, professional fighter Jamie-Ray has the skills and desire to get you into shape. With a background in dancing allowing him to work with celebrities such as Alexandra Burke and Mel C, plus his martial arts expertise, there’s pretty much nothing Jamie can’t do. He has a passion for sharing his knowledge and will drive you to success.`,
      image: require("./img/AS-Jamie-2-2000x1472.jpg?min=320,max=1400,steps=6")
    }
  ],
  all: function() {
    return this.players;
  },
  get: function(id) {
    const isPlayer = item => item.id === id;
    return this.players.find(isPlayer);
  }
};

export default PlayerAPI;
