/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/translations', function (req, res){
  fs.readdir(path.join(__dirname,'translations'), function (err, data){
    var translations = _.chain(data).filter(function (item){
      return item.indexOf('.json') != -1;
    }).map(function (item){
      return item.replace('.json','');
    }).value();
    res.setHeader('Cache-Control', 'no-cache');
    res.json(translations);
  })
})
app.get('/api/translation/:lang', function(req, res) {
  var json_path = path.join(__dirname,'translations', req.params.lang+'.json');
  res.setHeader('Cache-Control', 'no-cache');
  res.json(require(json_path));
});

app.post('/api/translation/:lang', function(req, res) {
  var json_path = path.join(__dirname,'translations', req.params.lang+'.json');
  fs.writeFile(json_path, JSON.stringify(req.body.json, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(req.body.json);
    });

});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
