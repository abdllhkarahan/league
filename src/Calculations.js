import React, {Component} from 'react';
import './Calculations.css';

export default class Calculations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weekNumber: 0,
		};

	this.teams = Object.keys(this.props.teams).map((key, index) => {
		return {
			name: key,
			points: 0,							//puan
			win: 0,									//kazanma durumu
			draw: 0,								//beraberlik durumu
			lose: 0,								//kayıp durumu
			goaldiff: 0,						//averaj
			compare: 3,							//karşılaştırma değeri
			chmpPer: 0,							//şampiyon olma olasılığı
			power: this.props.teams[key],
		}
	});
			this.teamsOrdered = [];
			this.fixture = [
				[0, 1, 2, 3],
				[0, 2, 1, 3],
				[0, 3, 1, 2],
				[3, 0, 2, 1],
				[2, 0, 3, 1],
				[1, 0, 3, 2]
			];
			this.timedID = 0;
	}

		orderTeams = () => {
			for (let t = 0; t < this.teams.length; t++)
			{
				for (let t1 = t + 1; t1< this.teams.length; t1++)
				{
					if (this.teams[t].points > this.teams[t1].points
				    ||
			    	((this.teams[t].points === this.teams[t1].points)
				    &&
			    	this.teams[t].goaldiff > this.teams[t1].goaldiff))
					{
						this.teams[t].compare--;
					}
						else if (this.teams[t].points < this.teams[t1].points
		        ||
		        ((this.teams[t].points === this.teams[t1].points)
		        &&
		        this.teams[t].goaldiff < this.teams[t1].goaldiff))
						{
						this.teams[t1].compare--;
					}
						else {
							this.teams[t].compare--;
						}
					}
				}
				this.teams.forEach(team => {
					this.teamsOrdered[team.compare] = team;
					team.compare = 3;
				});
		}

		playMatch = () => {
			if (this.state.weekNumber < 6) {
				const teamIndexes = this.fixture[this.state.weekNumber];
				for (var i = 0; i < teamIndexes.length; i += 2) {
					const indexHomeTeam = teamIndexes[i];
					const indexAwayTeam = teamIndexes[i + 1];
					const homeTeam = this.teams[indexHomeTeam];
					const awayTeam = this.teams[indexAwayTeam];
					const homeTeamGoals = Math.round((Math.random() * 10 * 1.5 * homeTeam.power) / 4); // ev sahibi takımın gücünü 1.5 ile çarpıyorum. Tezahurat önemli.
					const awayTeamGoals = Math.round((Math.random() * 10 * awayTeam.power) / 4);
					if (homeTeamGoals > awayTeamGoals) {
						homeTeam.points += 3;
						homeTeam.win += 1;
						homeTeam.goaldiff += (homeTeamGoals - awayTeamGoals);

						awayTeam.lose += 1;
						awayTeam.goaldiff += (awayTeamGoals - homeTeamGoals);
					}
					else if (homeTeamGoals < awayTeamGoals) {
						awayTeam.points += 3;
						awayTeam.win += 1;
						awayTeam.goaldiff += (awayTeamGoals - homeTeamGoals);

						homeTeam.lose += 1;
						homeTeam.goaldiff += (homeTeamGoals - awayTeamGoals);
					}
					else {
						homeTeam.points += 1;
						homeTeam.draw += 1;

						awayTeam.points += 1;
						awayTeam.draw += 1;
					}
						const indexResult = (this.state.weekNumber * 2) + (i / 2);
							localStorage.setItem(indexResult,
						(homeTeam.name + " " + homeTeamGoals + " - " + awayTeamGoals + " " + awayTeam.name));
					}
					this.setState({weekNumber: this.state.weekNumber + 1});
					return true;
					}
					else {
						return false;
				}
			}

		finishLeague = () => {
				this.timedID = setInterval(() => {
						this.playMatch();
						if (this.state.weekNumber > 6) {
								clearInterval(this.timedID);
						}
				}, 700);
				return true;
		}

    render() {
        this.orderTeams();

		return (
			<div>
			<div id="mainDiv">
				<table>
					<thead>
					<tr style={{backgroundColor: "white"}}>
						<th
							id="leagueTable"
							colSpan="7">
							Lig Tablosu
						</th>
					</tr>
					</thead>
					<thead>
					<tr
						style={{backgroundColor: "white"}}>
						<th id="teams">Takımlar</th>
						<th>Puan</th>
						<th>Kazanma</th>
						<th>Beraberlik</th>
						<th>Kaybetme</th>
						<th>Averaj</th>
						<th style={{
							width: 300,
							border: 0,
							display: this.state.weekNumber === 0 ? "none" : "block"
					}}>
						{this.state.weekNumber}. Hafta Maç Sonuçları
						</th>
					</tr>
					</thead>
					<tbody>

					{this.teamsOrdered.map((team, index) => {
						return (
							<tr
								style={{backgroundColor: "#f2f2f2"}}
								key={index}>
								<td>{team.name}</td>
								<td>{team.points}</td>
								<td>{team.win}</td>
								<td>{team.draw}</td>
								<td>{team.lose}</td>
								<td>{team.goaldiff}</td>
								<td style={{
									width: 300,
									display: index < 2 ? "block" : "none"
								}}>
								{localStorage.getItem(index + (this.state.weekNumber - 1) * 2)}
								</td>
							</tr>
						)
					})}
					</tbody>
				</table>
					<button
						id="finishLeague"
						onClick={this.finishLeague}>
						Ligi Bitir
					</button>
					<button
						onClick={this.playMatch}>
						Sonraki Hafta
					</button>
				</div>
				<div style={{float: "none"}}>
					<table
						id="champPer"
						style={{display: this.state.weekNumber > 3 ? "block" : "none"}}>
						<thead>
							<tr>
								<th colSpan="2">
									{this.state.weekNumber}. Hafta Şampiyon Olma Olasılıkları
								</th>
							</tr>
						</thead>
						<tbody>
							{this.teamsOrdered.map((team, index) => {
								return <tr key={index}>
									<td>{team.name}</td>
									<td>%{team.chmpPer}</td>
								</tr>
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
