import React, { Component } from 'react';
import './App.css';
import Card from './Card';
// import { Text } from '../node_modules/react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.state = {
      cardSiblings: []
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
    this.setState({
      cardSiblings: allSiblings
    });

    // From Content divs, get their children, which contains the modals

    this.move.addEventListener("click", (ele) => {
      // Rearrange modals
      const s = this.state.cardSiblings;
      for (var i=0; i<s.length; i++) {
        if (s[i].length > 1) {
          var first = s[0][0].lastChild; // Very first card out of all siblings
          for (var j=1; j<s[i].length; j++) {
            if (ele.target === s[i][0].firstChild) {

            }





            if ((ele.target === s[i][j].firstChild) && (s[i][j].lastChild.style.display === "none")){ // Click on bottom card
              var offsetBottom = s[i][j].firstChild.offsetTop + s[i][j].firstChild.offsetHeight;





              if (first.offsetTop > 0) {
                first.style.top = (Number(first.offsetTop) - 50).toString() + "px";
                console.log("case 1 runs");
              }
            }

            else if (i>0) { // Click on top card
              if((ele.target === s[i-1][j].firstChild) && (s[i][j].lastChild.style.display != "none")) { // Click on top card
                s[i][j].lastChild.style.top = (Number(s[i][j].offsetTop) + 50).toString() + "px";
                console.log("case 2 runs");
              }
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
