function start() {
    console.log("game starts")
    const finish_line = {
        tag: undefined,
        pos: undefined
    }
    finish_line.tag = document.getElementById("end-line");
    finish_line.pos = finish_line.tag.getBoundingClientRect();
    const box_tags = document.getElementsByClassName("box");
    for (let i = 0; i < box_tags.length; i++) {
        const box_ele = box_tags[i];
        box_ele.className += "start-the-race";
        const travel_time = String(Math.random(100, 200)).slice(1, 3);
        const default_trave_time = "3";
        box_ele.style.animation = `move-car ${default_trave_time}${travel_time}s cubic-bezier(0.25, 0.34, 0.43, 0.68) forwards`;
    }
    watch_game(finish_line);
}

function display_score(score) {
    const scoreBoard = document.getElementById("score-board");
    score.map((x, idx) => {
        console.log("position - ", idx, " : ", x.id);
        document.getElementById('score-' + idx).innerText = x.id;
        scoreBoard.style.animation = "show-board 1s ease-in forwards"
    });
}

function watch_game(finish_line) {
    const score = [];
    const completed = [];

    const interval = setInterval(() => {
        const cars_tags = document.getElementsByClassName("cars");
        for (let i = 0; i < cars_tags.length; i++) {
            car_pos = cars_tags[i].getBoundingClientRect();
            if (!completed.includes(i) && car_pos.x >= finish_line.pos.x) {
                score.push(cars_tags[i]);
                completed.push(i);
            }
        }
    }, 50); 

    setTimeout(() => {
        console.log('end of game'); 
        clearInterval(interval);
        console.log('score');
        display_score(score);
    }, 5000); 
}