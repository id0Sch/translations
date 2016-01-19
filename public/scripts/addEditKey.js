// tutorial1.js
var EditKey = React.createClass({
    render: function () {
        return (
            <div class="edit-key">
                <h1>Edit Key</h1>
                <keyInsert/>
            </div>
        );
    }
});

var keyInsert = React.createClass({
    render: function () {
        return (
            <div class="key-insert">
               <label>key</label>
                <input/>
            </div>
        );
    }
});


ReactDOM.render(
    <EditKey/>,
    document.getElementById('content')
);