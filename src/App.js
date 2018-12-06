import React, { Component } from 'react';
import './App.css';
import Card from './Card';
// import { Text } from '../node_modules/react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.state = {
      cardSiblings: {}, // {card: group#}
      openCards: [], // dictionary of groups and open cards {"Group1": [card1]}
      cardLinks: {"substring": "link"}
    }
  }

  componentDidMount() {
    // Make groups first
    var m = document.getElementsByClassName("Context");
    var allSiblings = [];
    var findSiblings = [];
    findSiblings.push(m[0]);
    for (var i=0; i<m.length; i++) {
      if (i < m.length-1) {
        if ((m[i+1].getBoundingClientRect().top - m[i].getBoundingClientRect().bottom <= 200) || (m[i].top - m[i+1].bottom <= 200)) {
          findSiblings.push(m[i+1])
        }
        else {
          allSiblings.push(findSiblings);
          findSiblings = [m[i+1]];
        }
      }
    }
    console.log("printing allSiblings...");
    console.log(allSiblings);
    this.setState({
      cardSiblings: allSiblings
    });

    // From Content divs, get their children, which contains the modals

    this.move.addEventListener("click", (ele) => {
      // Rearrange modals
      const s = this.state.cardSiblings;
      for (var i=0; i<s.length; i++) {
        if (s[i].length > 1) {
          var first = s[0][0].lastChild;
          console.log(s[0][0].firstChild.offsetHeight);
          //offsetBottom = offsetTop + offsetBottom
          //make sure it doesn't keep moving up lol
          for (var j=1; j<s[i].length; j++) {
            console.log(s[i][j].lastChild.style.display);
            if (ele.target === s[i][j].firstChild){
              if (first.offsetTop > 0) {
                first.style.top = (Number(first.offsetTop) - 100).toString() + "px";
                console.log("case 1 runs");
              }
            }

            else if ((ele.target === s[0][0].firstChild) && (s[i][j].lastChild.style.display != "none")) {
              s[i][j].lastChild.style.top = (Number(s[i][j].offsetTop) + 100).toString() + "px";
              console.log("case 2 runs");
            }
          }
        }
      }
      return null;
    });
  }

  move(node) {
    this.move = node;
  }

  hyperlinkify(link) {
    return (
      <div>
      <a href={link}>Click here to learn more.</a>
      </div>
    );
  }

  style1 = {
    margin: "50% auto",
    width: "100%",
    marginTop: "5px",
    marginBottom: "0",
  }

  insertImage(image, desc) {
    return (
      <img src={image} alt={desc} style={this.style1}/>
    );
  }

  checkCollision(top,bottom,clicked) {
    var top_offsetBottom = top.offsetTop + top.offsetHeight;
    var move = -1;
    if (bottom.offsetTop <= top_offsetBottom) {
      if (clicked === top) { // Move bottom card
        move = top_offsetBottom + 50;
      }
      else { // Move top card
        if (top.offsetTop > 0) {
          move = bottom.offsetTop - 50;
        }

      }
    }
    return move;
  }

  render() {
    return (
      <div className="App">
        <div ref={this.move} className="Container">
          <p>
          <div className="headline">When Elon Musk Tunnels under your home:</div>
          <img src="https://cdn.theatlantic.com/assets/media/img/2018/11/13/20181112_Atlantic_Musk_illustration_v5/1920.jpg?1542210722" alt="Elon Musk" style={this.style1}/>
          <br></br><br></br>
          Vicky Warren feels like she’s been attacked from all sides lately. Across the street from her rental apartment in the working-class Los Angeles County <Card extraImage={this.insertImage("https://img.bestplaces.net/compare-cities/0632548_CA_Hawthorne.png","Map of Hawthorne")} modalContent="Hawthorne is a Los Angeles County city. Hawthorne has a population of nearly 87,000 within a six square mile area. It is located roughly 5 miles from the Los Angeles International Airport." extraLink={this.hyperlinkify("http://www.cityofhawthorne.org/about-hawthorne/&sa=D&ust=1544075782455000&usg=AFQjCNFAkbA667IaYlaUnl6xjBYDr4M65g")}>city of Hawthorne</Card>, noisy planes take off and land at all hours, diverted to the local municipal airport from wealthier Santa Monica, where neighbor complaints have restricted air traffic. On the other side of her apartment, cars on the 105 Freeway sound the frustration of L.A. traffic. She’s even getting assailed within her walls: Termites have invaded so completely that she can’t keep any food uncovered. Flea bites cover her legs; rats are aggressively attacking the boxes she has stored in her garage.
          <br></br><br></br>
          So Warren was disappointed, but not surprised, to learn that invaders are coming from underground, too. She lives on 120th Street, where 40 feet underground <Card modalContent="Elon Musk is a South African born entrepreneur. Musk is the CEO of Tesla, Neuralink, SpaceX and The Boring Company. He became a billionaire when he sold his company PayPal in 2002.">Elon Musk</Card>’s <Card modalContent="The Boring Company is a tunnel construction company founded by Elon Musk in 2016. The goal of the company is to reduce congestion in cities, through creating fast to dig, low cost tunnels that would enable rapid transit across densely populated regions." extraLink={this.hyperlinkify("https://www.boringcompany.com/faq/&sa=D&ust=1544075782444000&usg=AFQjCNEo1x3B20_Q1YOMt7ExiZnDUsZFvQ")}>Boring Company</Card> is building a 14-foot-wide, <Card extraImage={this.insertImage("http://la.streetsblog.org/wp-content/uploads/sites/2/2018/04/BoringTunnelconceptmap.jpg", "Concept Map of Transit System")} modalContent="In 2017, The Boring Co concept map showed a 6.5-mile proof-of-concept tunnel extending from Westwood to near Inglewood. With a 14-foot wide tunnel extending 2.7 miles, the project footprint (not counting on-ramps, staging areas) would measure 4.58 acres." extraLink={this.hyperlinkify("https://la.streetsblog.org/2018/04/16/elon-musk-boring-company-test-tunnel-could-get-fast-tracked-blocking-metros-sepulveda-rail-project/&sa=D&ust=1544075782451000&usg=AFQjCNH00mpeTQIYVyWhdtgKK4Twuhtkiw")}>mile-long tunnel</Card> to pilot a futuristic transit system untested anywhere in the world. When it’s finished in December, the tunnel will start at the nearby headquarters of <Card modalContent="SpaceX designs, manufactures and launches advanced rockets and spacecraft. The private company was founded in 2002 by Elon Musk to revolutionize space technology, with the ultimate goal of enabling people to live on other planets." extraLink={this.hyperlinkify("https://www.spacex.com/about&sa=D&ust=1544075782442000&usg=AFQjCNHpYakQMV0CH4RhQMae16GOr6fquQ")}>SpaceX</Card>, Musk’s aerospace company, and end a few blocks past Warren’s apartment. “We’re just sandwiched in between so much already,” Warren told me, shaking her head.
          <br></br><br></br>
          Musk sees the future of American transportation in tunnels like this one. Inside them, electric skates would whisk cars and pods containing passengers to their destinations; eventually, tunnels could also be used for a “<a href="https://www.spacex.com/hyperloop">hyperloop</a>,” which would transport people even faster through a network of low-pressure tubes. Musk <a href="https://www.wired.com/story/engineers-dont-totally-dig-musk-tunneling/">has pledged</a> to revolutionize tunneling technology, and says that digging 40 feet underground will make less noise than someone walking on the surface would. Musk fans and <Card modalContent="Chicago Mayor Rahm Emanuel and Elon Musk met in June of 2018 at the CTA to announce plans for an express connection between O'Hare International Airport and downtown Chicago. Emanuel called Elon Musk's proposed 12-minute express tunnel to O'Hare 'the fast lane to Chicago's future'." extraLink={this.hyperlinkify("https://www.chicagotribune.com/news/local/politics/ct-met-ohare-high-speed-transit-elon-musk-rahm-emanuel-20180614-story.html&sa=D&ust=1544075782473000&usg=AFQjCNE7B3QsjBuKfoW-0oDDHvgKCuJXOA")}>mayors love the idea</Card>—the Boring Company told me a new city makes contact daily—and municipalities like Hawthorne have been quick to approve the tunneling. But above ground, <a href="https://www.census.gov/quickfacts/fact/table/hawthornecitycalifornia/PST045217">where</a> the poverty rate is 19.2 percent and the median household income is $45,089, people like Warren struggle to meet basic housing needs. They know nothing about Elon Musk or his dreams.
          <br></br><br></br>
          Even if Musk is building world-changing transportation underneath Hawthorne, and even if the residents ultimately welcome the technology, he is undertaking this project with strikingly little public input or oversight.
          <br></br><br></br>
          The boring company’s chosen tunneling site, 120th Street, is a hodgepodge of houses, random businesses, and, most of all, cars. On one side sits the high fence of the Hawthorne airport and a flight school; on the other side is the housing complex where Warren lives. A row of defeated-looking single-family houses sits behind locked fences, their windows grimy from the four lanes of traffic whizzing by. Nearby 119th Place is a tightly-knit neighborhood where the homes are small, with pocket-size front yards and barking dogs. They are largely owned by black and Latino families who bought here because it was affordable, being sandwiched in between a freeway and an airport. That affordability comes with a trade-off: The greater Los Angeles area has the worst <a href="http://graphics.latimes.com/responsivemap-pollution-burdens/">pollution</a> in the country, and it’s worse near freeways and airports.
          <br></br><br></br>
          I talked to a dozen people who live along the tunnel’s route, and most said they hadn’t witnessed any extra noise or traffic. But none had been informed ahead of time that a private company would be digging a tunnel beneath the street. Some only learned about the tunnel in mid-2018—not when the digging started, in 2017—because the company purchased a dilapidated house on 119th Place for nearly $500,000 in cash. (Other homes in the neighborhood are assessed at between $200,000 and $500,000.) The company plans to install an elevator in the garage of the house to practice raising cars from the tunnel to ground level. It says it will rent the rest of the house to SpaceX employees.
          <br></br><br></br>
          The company sent letters to some neighbors about the project and held public meetings to discuss it with residents in July 2018. But when those public meetings occurred, the tunnel was nearly complete. This is an oversight that would have been unimaginable in a higher-income neighborhood. Indeed, when Musk tried to build another underground tunnel in a wealthier neighborhood in West L.A., <Card modalContent="In May of 2018, the Brentwood Resident's Coalition and the Sunset Coalition filed lawsuits over the city of Los Angeles' proposal to fast-track the project by exempting it from environmental review. California’s environmental regulations 'cannot be evaded by chopping large projects into smaller pieces that taken individually appear to have no significant environmental impacts,' the complaint said." extraLink={this.hyperlinkify("https://www.latimes.com/local/lanow/la-me-musk-tunnel-boring-la-20180511-story.html&sa=D&ust=1544075782447000&usg=AFQjCNFzxX98VDQA8L8i7Ozs4MJCM3DaAg")}>residents quickly sued</Card>. The project got tied up in court, and the Boring Company said it was no longer a priority. This dynamic is common in the building of public infrastructure, too. Wealthier individuals are more likely to have the time and money it takes to launch a successful nimby campaign.
          <br></br><br></br>
          Yet, in many ways, the tunnel is a triumph of privatization. Plans to extend the Los Angeles Metro system under the Sepulveda Pass first went on the ballot in 2016, after <a href="http://theplan.metro.net/wp-content/uploads/2018/05/report-theplan-lessons-learned-2018.pdf">years</a> of planning; the project itself won’t be completed for decades, because of federal and state regulations. Musk just needs to find the money. Since the Boring Company is private, it is able to avoid the years of <Card modalContent="The Boring Co tunnel would be in the same location where Metro is planning its voter-approved Sepulveda Transit Corridor project, anticipated to be a subway. City Council member Paul Koretz put forward a motion to exempt Boring Co’s “proof of concept” tunnel from environmental review." extraLink={this.hyperlinkify("https://la.streetsblog.org/2018/04/18/boring-company-tunnel-exemption-motion-approved-by-l-a-public-works-committee/&sa=D&ust=1544075782476000&usg=AFQjCNG-KYEY9LKnOLR0XgAGCl4NT1IwDA")}>tedious environmental reviews</Card> required when the government tries to build transit. It is also exempt from “Buy American” requirements necessary for projects that receive federal funding. This allows the company to try a new technology much faster than if the government got involved. Musk’s SpaceX was able to lower the cost of space travel through private rocketry, and the Boring Company hopes to do the same for tunneling, a spokesman told me.
          <br></br><br></br>
          But environmental review and public input exist for a reason—to make sure everyone impacted by a project has a say. That input is anathema to entrepreneurs who want to move quickly with low overhead and few regulations. That may have worked for Bill Gates, Sergey Brin, and Mark Zuckerberg, but they were tinkering with computers, not digging transit under someone else’s backyard.
          <br></br><br></br>
          <img src="https://cdn.theatlantic.com/assets/media/img/posts/2018/11/IMG_6595/1a2309871.jpg" alt="Boring Company bought house" style={this.style1} />
          The Boring Company bought a house on 119th Place in Hawthorne, California.
          <br></br><br></br>
          Many of Hawthorne’s residents said they felt like even if they had had their say, it wouldn’t have mattered. “They have so much money, so much capital, to make things happen, that your vote wouldn’t mean anything,” Fred Lopez, who lives a few houses down from the Boring Company house, told me. During the planning-commission hearing in which the Boring Company’s plans were discussed, one resident, Sammy Andrade, said he was worried about whether the digging would make his home sink into the ground eventually. Then he said, “But I’m a nobody, and I know there’s a lot of political money involved with this big project for the city.”
          <br></br><br></br>
          The residents are right: It might have been hard to stand in the way of what many places see as progress. Musk’s plans have cities across the country salivating. He says he’s gotten verbal permission to build a hyperloop between New York and Washington D.C., and he joined Chicago Mayor <Card modalContent="Rahm Israel Emanuel is the 46th and first Jewish Mayor of Chicago. He was elected in 2011 and re-elected for a second term as Mayor of Chicago in 2015." extraLink={this.hyperlinkify("https://www.cnn.com/2013/02/13/us/rahm-emanuel-fast-facts/index.html&sa=D&ust=1544075782458000&usg=AFQjCNEzUJ0WEeANGGEbsT-3YS3Wi0QKGg")}>Rahm Emanuel</Card> in June to announce plans for an <Card extraImage={this.insertImage("https://c-7npsfqifvt34x24x78x78x78x2euscjnhx2edpn.g00.chicagotribune.com/g00/3_c-7x78x78x78.dijdbhpusjcvof.dpn_/c-7NPSFQIFVT34x24iuuqx3ax2fx2fx78x78x78.uscjnh.dpnx2fjnh-6c33dg36x2fuvscjofx2fdu-nfu-pibsf-usbotju-fmpo-nvtl-nbq-hgy-31291725x2f861x2f861y533x3fj21d.nbslx3djnbhf_$/$/$/$/$/$", "Map")} modalContent="Map of Underground Transit System" extraLink={this.hyperlinkify("https://www.chicagotribune.com/news/data/ct-met-ohare-transit-elon-musk-map-gfx-20180614-graphic.html&sa=D&ust=1544075782480000&usg=AFQjCNH53vL8qtutL8KHGq3UwsE_ta1AqA")}>underground transit system</Card> between Chicago and O’Hare International Airport.
          <br></br><br></br>
          Hawthorne seems particularly eager to make sure that Musk and the Boring Company keep their transportation research in the city, and not elsewhere. “We want this to be an awesome project that’s going to propel us into the future and determine what the future of transportation is,” Hawthorne Mayor <Card modalContent="Alex Vargas is the Hawthorne Mayor. He was elected in 2015 after serving on the Hawthorne City Council for 6 years.">Alex Vargas</Card> said during the 2017 meeting when the digging was approved. Mike Talleda, the chairperson of the Hawthorne planning commission, reminded his colleagues during a 2018 meeting that although the project seemed a little “James Bond,” the people who work at the Boring Company “are pretty high-tech, qualified engineers” and they could be trusted to dig a tunnel right. “Someday we might be able to say, ‘Hey, this new system began in our little neighborhood right under my house,’” Talleda said. When one member moved to amend the zoning code so that the Boring Company could build the elevator, two others stumbled over each other in their rush to second him. It passed 5–0.
          <br></br><br></br>
          No american city has anything even vaguely similar to Musk’s project. That may be partly due to the fact that transit experts say the smartest way to improve public transit is to expand upon existing systems—add more rail lines to existing subways, more buses to existing routes. Even cities building these systems for the first time tend to integrate them with other dominant modes of transit, taking into consideration how people are already moving through the space. The hyperloop, by contrast, is “incompatible with every other mode of transportation,” as Jeff Tumlin, a transit consultant at <Card modalContent="Nelson\Nygaard Consulting Associates is a transportation planning firm. The company develops transportation systems to promote broader community goals of mobility, equality, economic development, and healthy living." extraLink={this.hyperlinkify("http://nelsonnygaard.com/portfolio/&sa=D&ust=1544075782479000&usg=AFQjCNFttpwp3y0frNxfMoxV5u20InF0pw")}>Nelson\Nygaard Consulting Associates</Card>, told me. It would be difficult to link up the tunnel with Metro Center, a subway station in Central L.A., and there are few public-transit modes near the Hawthorne location where the Boring Company is digging. (A Boring Company spokesman told me that many of its tunneling projects will someday hook up to public transit.)
          <br></br><br></br>
          Musk seems more interested in finding a convenient test site for a bold idea, one that he believes leapfrogs existing technological options, rather than doing the tedious work of improving an old system. “We seem to be having two separate conversations: one focused on getting around congestion with flying cars and boring tunnels, and another focused on actually solving congestion with pricing policies and public transit,” says Molly Turner, a lecturer at the Haas School of Business at UC Berkeley. Earlier this month, Musk <a href="https://twitter.com/awalkerinLA/status/1060672468040335360">publicly</a> criticized plans to build high-speed rail in front of a room of mayors working on precisely those projects.
          <br></br><br></br>
          SpaceX was also one of the most vocal opponents to a proposed apartment complex adjacent to its headquarters, the very same headquarters where the test tunnel begins, even though urban planners say that building housing near employment is one of the very best ways to reduce traffic and improve transit for everyone. “While we do believe there is an absolute need for affordable housing in the city of Hawthorne, we do not think that this specific site is the place for it,” a SpaceX director of facilities, who is now working on the test-tunnel project, said in 2017.
          <br></br><br></br>
          Musk is not alone in his approach—most Americans do not seem particularly interested in investing in existing transportation technology either. They prefer, instead, to dream up new ways to get around. For example: A proposed tax in Nashville to fund public-infrastructure improvements <a href="https://www.citylab.com/transportation/2018/05/what-went-wrong-with-nashvilles-transit-plan/559436/">was defeated</a> because opponents argued that cities shouldn’t be investing in “outdated” technologies like trains, since autonomous cars will soon make them obsolete. “I worry that the big new tech ideas will distract us—or worse, divert resources—from the more complex policy decisions and infrastructure investments we need to make to solve the root causes of our mobility problems,” Turner told me. Some Americans think public transit is so bad, it seems better to throw it all away and build something new.
          <br></br><br></br>
          Indeed, Musk seems to have first gotten excited about the hyperloop while pooh-poohing another publicly funded transit system. In 2013, in a <a href="https://www.tesla.com/blog/hyperloop">blog post</a> on the website of <Card modalContent="Tesla is an automotive and energy company that was founded in 2003. The company builds all-electric vehicles as well as clean energy generation and storage products." extraLink={this.hyperlinkify("https://www.tesla.com/about&sa=D&ust=1544075782465000&usg=AFQjCNHsxB3zhfM0i6qRorBUN0X320EaxA")}>Tesla</Card>, his electric-car company, Musk criticized plans for a high-speed rail in California. In 2008, voters had approved a $9 billion bond to build one, but Musk predicted it would be expensive and slow. Instead, he proposed the hyperloop, which would whisk people in aluminum pods through vacuum tubes elevated on columns running next to Interstate 5, California’s biggest north–south route. Since the state was throwing away its money on high-speed rail, he would have to fund it himself.
          <br></br><br></br>
          The project lay dormant until late 2016, when Musk <a href="https://twitter.com/elonmusk/status/810108760010043392">tweeted</a> that “traffic is driving me nuts,” and that he was “going to build a tunnel boring machine and just start digging.” By January 2017, he had announced plans to build a tunnel across from SpaceX. By April, he’d acquired a tunnel-boring machine and announced a cheeky name for the new venture: the Boring Company.
          </p>
        </div>

      </div>
    );
  }
}

export default App;
