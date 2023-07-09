const project_list = [
  {
    project_name: 'Portfolio Website',
    project_description: 'My most recent project as I feel a need to more publicly and personally show my career progress. This is a first version of a portfolio website I made for myself. It is made with ReactJS, Material-UI, and TypeScript.',
    experience_chips: [
      "HTML/CSS",
      "Material-UI",
      "ReactJS",
      "TypeScript",
      "React Spring"
    ],
    github_link: "https://github.com/quazar22/portfolio",
    github_link_text: "Check out my portfolio code on GitHub, and feel free to roast me for it!",
    image: "/pics/portfolio_site.jpg"
  },
  {
    project_name: 'The Randoms Generator',
    project_description: 'This is a generator for different types of random values and also some simple tools that I\'ve built over a while. It is made with ReactJS, Material-UI, and TypeScript. I plan on adding a lot more functionality to it in the future along with a better UI and possibly advertisements. I also plan to branch out from just random generators and add some other tools that I\'ve built over the years.',
    experience_chips: [
      "ExpressJS",
      "HTML/CSS",
      "Material-UI",
      "Nginx",
      "NodeJS",
      "Pocketbase",
      "ReactJS",
      "TypeScript",
    ],
    deployed_link: "https://therandomsgenerator.com/",
    image: "/pics/randoms_site.jpg"
  },
  {
    project_name: 'Home Automation',
    project_description: 'This is a home automation system that I setup for my home. It is setup with a Raspberry Pi 3B+ running Home Assistant and a few other services. It is setup to control lights in my home for a few different rooms and also to manage my home server\'s dynamic DNS. I plan on adding more functionality to it in the future.',
    experience_chips: [
      "Docker",
      "Home Assistant",
      "Linux",
      "Nginx",
      "Raspberry Pi 3B+",
      "DDNS",
      "DigitalOcean",
      "Arduino/ESP32/ESP8266",
      "MQTT",
      "NodeJS",
      "Python",
      "mmWave Radar",
    ],
    image: "/pics/home_automation.jpg"
  },
  {
    project_name: 'DIY Nanoleaf Alternative',
    project_description: "This is a DIY Nanoleaf alternative that I built for my home. It is made with 3D printed parts, WS2812B LED strips, and an ESP32 microcontroller. It is controlled with WLED and Home Assistant. The 3D printed parts were designed by me in Blender and sliced with Cura. The WLED software was used to tie it into both my home Alexa and Home Assistant, and I have tied the on/off state of the light to a mmWave radar in my office so that it and my overhead light turn on when I enter the room and turn off when I leave.",
    experience_chips: [
      "3D Printing",
      "Arduino/ESP32",
      "WLED",
      "Python",
      "MQTT",
      "Home Assistant",
      "mmWave Radar",
    ],
    image: "/pics/diy_nanoleaf.gif"
  },
  {
    project_name: 'Load Testing Software',
    project_description: 'This is a specialized load testing software that I built for my company on my free time. It was made with python and uses the beautifulsoup4 and requests libraries. It was used to load test our servers to make sure that they could handle the maximum load that we were contracted to handle.',
    image: "/pics/load_testing.jpg",
    experience_chips: [
      "Python",
      "BeautifulSoup4",
      "Python Requests"
    ],
    github_link_text: "Check out my load testing software code on GitHub",
    github_link: "https://github.com/quazar22/OldLoadTestingJustice",
  },
  {
    project_name: 'Mobile Game: Dead Station',
    project_description: "This is a simple game titled 'Dead Station' that I made in my free time during college. It is a 3D top-down zombie shooter game that I made with Unity and C#. While it is a simple game, I learned a lot about game development and Unity while making it and I plan on continuing to work on it in the future.",
    image: "/pics/game.jpg",
    experience_chips: [
      "Blender",
      "3D Modeling",
      "Model Texturing",
      "Model Rigging",
      "C#",
      "Mixamo",
      "GIMP",
      "Unity",
    ],
    github_link: "https://github.com/quazar22/DeadStation",
    github_link_text: "Check out Dead Station on GitHub"
  }
]

export default project_list;