let id = 0;
let clicked_element;
function initializeDragAndDrop() {
    let draggables = document.querySelectorAll('.block');
    let dropZones = document.querySelectorAll('.box');
    for(let i = 0; i+1 <= dropZones.length; i++)
    {
        console.log(dropZones[i].hasChildNodes())
        if(dropZones[i].hasChildNodes() == true)
        {

        }
    }

    draggables.forEach(draggable => {
        // ドラッグ開始時
        draggable.addEventListener('dragstart', (e) => {
            dropZones.forEach(dropZone => dropZone.classList.add('active'));
            e.dataTransfer.setData('text/plain', e.target.id);  // 要素のIDを渡す
        });

        // ドラッグ終了時
        draggable.addEventListener('dragend', () => {
            dropZones.forEach(dropZone => dropZone.classList.remove('active'));
        });
    });

    dropZones.forEach(dropZone => {
        // ドラッグ中にドロップゾーンが要素を受け入れるために必要
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        // ドロップ時
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            let draggedElementId = e.dataTransfer.getData('text/plain');
            let draggedElement = document.getElementById(draggedElementId);
            dropZone.appendChild(draggedElement); // ドロップゾーンに要素を追加
        });
    });
}

function add(color, text) {
    const data = {
        purple : {
            if: "もし$green$なら$br$$black$を実行する",
            for: " 最初だけ$red$を実行。$br$$green$を満たす時だけ$br$繰り返して、1回ごとに$br$$black$と$black$を実行する"
        },
        aqua: {
            move: "プレイヤーを$blue$歩進ませる",
            action: "$red$を実行する"
        },
        red: {
            set: "$blue$は$blue$",
            add: "$blue$+$blue$が$blue$",
            sub: "$blue$-$blue$が$blue$",
            mul: "$blue$÷$blue$が$blue$",
            div: "$blue$×$blue$が$blue$",
            twod: "$blue$は[$blue$,$blue$]"
        },
        green: {
            equal: "$blue$が$blue$$yellow$",
            more: "$blue$が$blue$以上$yellow$",
            more_than: "$blue$が$blue$超過$yellow$",
            less: "$blue$が$blue$以下$yellow$",
            less_than: "$blue$が$blue$未満$yellow$",
            hole: "$blue$は落とし穴$yellow$"
        },
        blue: {
            heart: "❤️",
            star: "⭐️",
            cat: "😺",
            dog: "🐶",
            rabbit: "🐰",
            tea: "🍵",
            orange: "🍊",
            apple: "🍎",
            text: "$text$"
        },
        yellow: {
            true: "である",
            false: "でない"
        }
        // その他の色データも追加
    };

    let canvas = document.getElementById('canvas');
    let last_element = document.getElementById('last_element');
    let new_element = document.createElement('div');
    new_element.setAttribute("id", "draggable-" + id);
    new_element.classList.add("block");
    new_element.classList.add(color);
    new_element.classList.add(text);
    new_element.setAttribute('onClick', 'clicked('+ String(id) +')')
    new_element.draggable = true;

    let place_text = data[color][text];
    place_text = place_text.replaceAll("$blue$", "<div class='blue_box box'></div>");
    place_text = place_text.replaceAll("$green$", "<div class='green_box box'></div>");
    place_text = place_text.replaceAll("$red$", "<div class='red_box box box'></div>");
    place_text = place_text.replaceAll("$yellow$", "<div class='yellow_box box'></div>");
    place_text = place_text.replaceAll("$black$", "<div class='black_box box'></div>");
    place_text = place_text.replaceAll("$br$", "<br>");
    place_text = place_text.replaceAll("$text$", "<input type='text' placeholder='0' class='text_box'>");

    new_element.innerHTML = place_text;
    id++;
    canvas.insertBefore(new_element, last_element);

    // 新しい要素が追加されたので、再度イベントを初期化
    initializeDragAndDrop();
}

// 最初のイベント初期化
initializeDragAndDrop();
function clicked(clicked_id)
{
    console.log(clicked_id)
    if(clicked_element != null)
    {
        clicked_element.classList.remove("clicked");
    }
    clicked_element = document.getElementById("draggable-" + clicked_id);
    console.log(clicked_element)
    clicked_element.classList.add("clicked");
}
function move(direction)
{
    switch (direction)
    {
        case "up":
            canvas.insertBefore(clicked_element, clicked_element.previousElementSibling);
            break;
        case "down":
            canvas.insertBefore(clicked_element, clicked_element.nextSibling.nextSibling);
            break;
    }
}
function del()
{
    clicked_element.remove()
}
