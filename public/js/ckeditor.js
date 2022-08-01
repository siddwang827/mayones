document.querySelectorAll(".editor").forEach((element) => {
    DecoupledEditor.create(element, {
        toolbar: {
            items: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "fontFamily",
                "fontSize",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "bold",
                "italic",
                "strikethrough",
                "underline",
                "|",
                "selectAll",
                "|",
                "-",
                "bulletedList",
                "numberedList",
                "todoList",
                "|",
                "outdent",
                "indent",
                "|",
                "alignment",
                "|",
                "link",
                "blockQuote",
                "|",
                "specialCharacters",
                "horizontalLine",
                "|",
                "sourceEditing",
                "|",
            ],
        },
        fontFamily: {
            options: [
                "default",
                "Microsoft JhengHei",
                "DFKai-sb",
                "PMingLiU",
                "Arial, Helvetica, sans-serif",
                "Courier New, Courier, monospace",
                "Georgia, serif",
                "Lucida Sans Unicode, Lucida Grande, sans-serif",
                "Tahoma, Geneva, sans-serif",
                "Times New Roman, Times, serif",
                "Trebuchet MS, Helvetica, sans-serif",
                "Verdana, Geneva, sans-serif",
            ],
            supportAllValues: true,
        },
    })
        .then((editor) => {
            const id = element.getAttribute("id");
            const toolbar = document.getElementById(`${id}-toolbar-container`);
            const editorName = element.getAttribute("editor-name");
            toolbar.appendChild(editor.ui.view.toolbar.element);

            window[`editor${editorName}`] = editor;
        })
        .catch((error) => {
            console.error(error);
        });
});
