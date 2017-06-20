/**
 * Created by anton on 6/16/17.
 */

let currentRoom = null;

class Room {
	availableColors = ['#f00', '#0f0', '#000', '#00f'];
	availablePoints = [{
		x: 300,
		y:300,
	}, {
		x: 900,
		y: 300,
	}];

	constructor(name) {
		this.users = [];
		this.name = Math.random() * 10;
		this.tick = 0;
	}

	addUser(id) {
		const user = new User(id, this.getColor(), this.getPoint());
		console.log('adding new user', user);
		this.users = this.users.concat(user);
	}

	getUser(id) {
		return this.users.find(user => user.id === id);
	}

	deleteUser(id){
		console.log('deleting user', id)
		this.users = this.users.filter(user => user.id !== id);
	}

	getColor() {
		return this.availableColors[Math.floor(Math.random() * 3)];
	}
	getPoint() {
		return this.availablePoints.shift();
	}
	addTick(){
		this.tick = this.tick + 1;
	}
	shouldUpdateClient(){
		return this.tick === this.users.length;
	}
}

class User {
	constructor(id, color, startPoint) {
		this.id = id;
		this.color = color;
		this.points = [startPoint];
	}

	addPoint(point){
		this.points.push(point);
		return this;
	}
	setPoints(points){
		this.points = (points);
		return this;
	}
}

export default (io, server) => {
	io.on('connection', function (socket) {
		console.log('a user connected');
		if (!currentRoom) {
			currentRoom = (new Room());
		}
		currentRoom.addUser(socket.id);
		socket.emit('user joined', {
			id: socket.id
		});

		if(currentRoom.users.length >= 2){
			console.log('starting game', currentRoom.users);
			io.emit('start game');
		}


		socket.on('disconnect', function () {
			console.log('user disconnected');
			currentRoom.deleteUser(socket.id);
		});




		socket.on('user update', ({id, points}) => {
			console.log(id, points, currentRoom.tick);
			const user = currentRoom && currentRoom.getUser(id);
			if (!user) return;
			user.setPoints(points);
			currentRoom.addTick();
			if(currentRoom.shouldUpdateClient()){
				currentRoom.tick = 0;
				io.emit('update', currentRoom.users)
			}
		});
	});

	server.use('/ping', (req, res) => {

		io.emit('ping', 'pong');
		io.clients((e, clients) => {
			res.json(clients)
		});
	})
}