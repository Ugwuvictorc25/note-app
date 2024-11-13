const addNoteBtn = document.querySelector(".add-note");
const notes = JSON.parse(localStorage.getItem("note"));

if (notes) {
	notes.forEach((note) => addNote(note));
}
addNoteBtn.addEventListener("click", () => addNote());

function addNote(text = "") {
	const note = document.createElement("div");
	note.classList.add("note");

	const innerHTMLText = `<div class="tools">
				              <button class="edict">
					              <img src="pen.svg" alt="pen" />
				              </button>
				              <button class="delete">
					              <img src="trash.svg" alt="trash" />
				              </button>
			              </div>
                    <div class="main ${text ? "" : "hidden"}"></div>
                    <textarea class="textarea ${text ? "hidden" : ""}" cols="10" rows="10"></textarea>`;
	note.innerHTML = innerHTMLText;

	const main = note.querySelector(".main");
	const textarea = note.querySelector(".textarea");
	textarea.value = text;
	main.innerHTML = text;

	textarea.addEventListener("input", (e) => {
		const { value } = e.target;
		main.innerHTML = value;
		updateLs();
	});

	note.querySelector(".delete").addEventListener("click", function () {
		note.remove();
		updateLs();
	});

	note.querySelector(".edict").addEventListener("click", function () {
		main.classList.toggle("hidden");
		textarea.classList.toggle("hidden");
		// updateLs();
	});

	document.body.appendChild(note);
}

function updateLs() {
	const allTextArea = document.querySelectorAll("textarea");
	const note = [];
	allTextArea.forEach((textArea) => note.push(textArea.value));
	localStorage.setItem("note", JSON.stringify(note));
}
