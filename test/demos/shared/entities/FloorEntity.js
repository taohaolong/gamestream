
var Entity = require('../ecs/Entity.js');

function FloorEntity() {
	return new Entity({
		physics: {
			position: {
				x: 0,
				y: 0,
				z: 0
			},
			rotation: {
				w: 1,
				x: 0,
				y: 0,
				z: 0
			},
			static: true
		},
		shapes: [
			{
				type: 'cube',
				size: {
					x: 50,
					y: 50,
					z: .1
				},
				position: {
					x: 0,
					y: 0,
					z: 0
				}
			}
		],
		view: {
			color: 0x666666
		}
	});
}

module.exports = FloorEntity;
