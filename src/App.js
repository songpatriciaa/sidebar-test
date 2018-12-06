import React, { Component } from 'react';
import './App.css';
import Card from './Card';
// import { Text } from '../node_modules/react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.state = {
      cardDivs: {}, // {card-button-text: cardDiv}
      cardSiblings: {}, // {card-button-text: group#}
      cardGroups: {}, // dictionary of groups and all cards {group#: [card1 - list of divs]}
      openCards: {} // Use this to check collisions between open groups {group#: [list of divs]}
    }
  }

  componentDidMount() { // Issue: all strings within the buttons must be unique
    // Make groups first
    var m = document.getElementsByClassName("Context");
    var cardSiblings = {};
    var cardDivs = {};
    var cardGroups = {};
    var findSiblings = []; // List of all divs
    var groupText = []; // List of all strings contained in the buttons
    var groupNo = 0;
    var rand = 0;
    findSiblings.push(m[0]);
    groupText.push(m[0].firstChild.firstChild.data);

    for (var i=0; i<m.length; i++) {
      cardDivs[m[i].firstChild.firstChild.data] = m[i]; // Map text of button to div
      if (i < m.length-1) {
        if ((m[i+1].getBoundingClientRect().top - m[i].getBoundingClientRect().bottom <= 200) || (m[i].top - m[i+1].bottom <= 200)) {
          findSiblings.push(m[i+1]);
          groupText.push(m[i+1].firstChild.firstChild.data);
        }
        else {
          cardGroups[groupNo] = findSiblings;
          for (var j=0; j<findSiblings.length; j++) {
            var t = groupText[j];
            cardSiblings[t] = groupNo;
          }
          findSiblings.length = 0;
          groupText.length = 0;
          findSiblings.push(m[i+1]);
          groupText.push(m[i+1].firstChild.firstChild);
          groupNo++;
        }
      }
    }
    cardGroups[groupNo] = findSiblings;
    for (var j=0; j<findSiblings.length; j++) { // Get the very last group
      cardSiblings[groupText[j].data] = groupNo;
    }

    this.setState({
      cardDivs: cardDivs,
      cardSiblings: cardSiblings,
      cardGroups: cardGroups
    });
    console.log(cardSiblings);
    console.log(cardDivs);
    console.log(cardGroups);


    // From Content divs, get their children, which contains the modals

    this.move.addEventListener("click", (ele) => { // Also need to close cards
      if (!ele.target.type) {
        return;
      }
      var groupNo = this.state.cardSiblings[ele.target.firstChild.data];
      if (this.state.openCards[groupNo]){
        for (var i=0; i<this.state.openCards[groupNo].length; i++) {
          if (this.state.cardDivs[ele.target.firstChild.data] === this.state.openCards[groupNo][i]) {
            this.state.openCards[groupNo].splice(i,1); // Remove from open cards when closing
          }
        }
      }
      // Rearrange modals
      const cardGroups = this.state.cardGroups;
      var openCards = this.state.openCards;
      // Iterate through cardGroups, check for collisions between siblings
      // Add open siblings to openCards
      var first = cardGroups[0][0].firstChild;
      // Find card target
      // Find group of card
      // Check if siblings are open
      console.log(this.state.cardDivs)
      var target = ele.target;
      var getModal = this.state.cardDivs[ele.target.firstChild.data].childNodes[1];
      console.log(ele.target.firstChild.data);
      console.log(this.state.cardDivs[ele.target.firstChild.data].childNodes[1].offsetHeight); // Get height of modal div

      // setTimeout(function(){ // Wait to get correct modal height
      //   console.log(getModal.offsetHeight);
      // },1);
      // console.log(setTimeout(this.checkCollision(getModal,getModal,getModal), 1));
      console.log(this.state.cardSiblings);
      var targetGroup = this.state.cardSiblings[ele.target.firstChild.data]; // Get group of clicked button
      console.log(targetGroup);
      if (targetGroup in openCards) {
        // Check collisions between open siblings
        for (var i=0; i < openCards[targetGroup].length; i++) {
          // console.log("opening for loop");
          if (ele.target.offsetTop < openCards[targetGroup][i].offsetTop) { // clicked div is on top
            // Move bottom div
            console.log("case 1 runs");
            var move = setTimeout(this.checkCollision(getModal,openCards[targetGroup][i],getModal), 1);
            console.log(move);
          }
          else { // clicked div is on bottom
            // Check for collision, place it below offsetBottom of top div
            // Move top div
            var top = openCards[targetGroup][i];
            console.log(top);
            var bottom = getModal;
            var clicked = getModal;
            console.log("case 2 runs");
            setTimeout(this.checkCollision(openCards[targetGroup][i],getModal,getModal),1);
            // setTimeout(function() {
            //   console.log(move);
            //   var top = openCards[targetGroup][i];
            //   top.lastChild.style.top = (Number(top.offsetTop) - move).toString() + "px";
            // }, 1);
          }
        }
        openCards[targetGroup].push(this.state.cardDivs[ele.target.firstChild.data]);
        this.setState({
          openCards: openCards
        });
      }
      else { // Add in first card
        var d = {};
        openCards[targetGroup] = [this.state.cardDivs[ele.target.firstChild.data]];
        this.setState({
          openCards: openCards
        });
      }


      for (var i=0; i<cardGroups.length; i++) {
        var group = cardGroups[i];
        for (var j=0; j<group.length; j++) {
          // Find card target
          // Check for top and bottom card
        }
      }
      // Iterate through openCards, check for collisions between groups
      // Pass top-most div of bottom group and bottom-most div of top group into checkCollision
      return null;
    });
  }

  move(node) {
    this.move = node;
  }

  checkCollision(top,bottom,clicked) {
    return setTimeout(function(){
      var top_offsetBottom = top.offsetTop + top.lastChild.offsetHeight;
      var move = 0;
      console.log(clicked);
      console.log(top);
      if (bottom.offsetTop <= top_offsetBottom) {
        if (clicked == top) { // Move bottom card
          console.log("move bottom?");
          console.log(top_offsetBottom);
          move = top_offsetBottom + 20;
          bottom.lastChild.style.top = move.toString()+"px";
        }
        else { // Move top card
          if (top.offsetTop > 0) {
            console.log("move top?");
            move = top_offsetBottom - bottom.offsetTop;
            console.log(move);
            top.lastChild.style.top = (Number(top.offsetTop) - move).toString() + "px";
          }
        }
      }

      return move;
    },1);

  }

  render() {
    return (
      <div className="App">
        <div ref={this.move} className="Container">
          <p>
          By Sidebar Team
          <br></br>
          <Card modalContent="Rio Rio masl;dkfjalskdjf jfklsjak jfksa;jf fdksla;jfslfj asfj flkdsa;lflskdjfa;sldkf ajfkdsl; fjsl">RIO DE JANEIRO</Card>—Brazilians began voting Sunday in a divisive presidential race expected to elect combative ex-army captain <Card modalContent="Lorem ipsum blah blah;las fjdksa; fjkdsl;ahfa ;sdkhg;ktkajsdf ahsldhkl; la;kfhdklsa;fh ;">Jair Bolsonaro</Card>, shifting Latin America’s largest nation sharply to the right. Mr. Bolsonaro, a champion of Brazil’s 1964-1985 right-wing dictatorship that he once served, has been polling at nearly 60% against Fernando Haddad of the leftist Workers’ Party over the past few weeks, although his lead narrowed to around 55% on the eve of Sunday’s runoff vote. A paratrooper-turned-congressman, Mr. Bolsonaro has pledged to usher in a new era of “order and progress”—Brazil’s national motto emblazoned on its flag—luring both rich and poor voters who are fed up with endemic corruption and terrified by spiraling crime. His rival Mr. Haddad, the stand-in candidate for former President Luiz Inácio Lula da Silva, who was jailed this year for corruption, has struggled to overcome voters’ hatred of the Workers’ Party, which ruled Brazil for much of the past 15 years and oversaw the country’s deepest recession on record as well as the vast <Card modalContent="The Car Wash corruption scandal was blablbalablabla very interesting content wow i am so educated now the sidebar is the best thing that has happened to me ever.">Car Wash corruption scandal</Card>. However, polls late Saturday showed a last-minute wave of support for the leftist candidate as celebrities and Brazil’s corruption-fighting former prosecutor general urged Brazilians to vote against Mr. Bolsonaro, whom they fear will set back gay and women’s rights, bully political opponents and pose a threat to the country’s young democracy. “We’re in the middle of a tense conflict between voters and parties...a moment of hope but also of doubt about Brazil,” said <Card modalContent="Ipsum Lorem this is fake content about arthur dias to see how the card looks when there is more text">Arthur Dias</Card>, a 19-year-old student, who lined up to vote Sunday morning near Copacabana beach in Rio de Janeiro, where a mood of quiet apprehension hung over the fun-loving neighborhood. Sunday’s vote brings to an end one of the most turbulent election campaigns in Brazil’s recent history, which has sparked rancorous feuds between families and friends. After surviving an assassination attempt last month, Mr. Bolsonaro has mostly campaigned from his Rio de Janeiro home, firing up supporters and taunting adversaries via social media. Meanwhile, Mr. da Silva has continued to call the shots for the Workers’ Party from his police cell in southern Brazil, holding frequent tete-a-tetes with Mr. Haddad, who registered as his lawyer to secure regular visitation rights. “I’ve never seen so much anger before,” said Wanderlei Guedes, a clinical psychologist in Brasília for 25 years, who said his patients have increasingly come to him after falling out with friends and work colleagues over the election. Mr. Bolsonaro’s likely win Sunday night would also mark the rupture of a party system that was established after the end of military rule in the mid 1980s, mirroring both the rise of anti-establishment politics and populist nationalism across the world. Running for the previously little-known conservative PSL Party, Mr. Bolsonaro would be the first presidential winner since 1989 who isn’t from the Workers’ Party or Brazil’s centrist PSDB Party. His rise has stunned pundits and rivals over recent months. Winning support from billionaire city bankers to Amazon tribesmen, he has appealed to voters across class and social divides, even converting scores of Mr. da Silva’s former followers. His pledge to give police carte-blanche to kill suspected criminals and arm civilians for self-defense has found support in a country with nearly 64,000 murders last year.
          </p>
        </div>

      </div>
    );
  }
}

export default App;
