
function LeftSandboxController ($scope, $http, SERVER, $rootScope) {
    let vm = this;

    vm.showCategory = showCategory;
    vm.emptyCatData = emptyCatData;
    vm.addText = addText;
    vm.tossImage = tossImage;
    vm.showPicker = showPicker;
    vm.changeFont = changeFont;
    vm.updateText = updateText;
    vm.fontSize = fontSize;
    vm.selectedAddText = selectedAddText;
    vm.selectedUpdateText = selectedUpdateText;
    vm.catData = null;

    vm.categories = {
        shapes: 'Shapes/Symbols',
        letters: 'Letters/Numbers',
        emojis: 'Emojis',
        nature: 'Nature',
        parties: 'Parties/Events',
        occupations: 'Occupations',
        music: 'Music',
        greekLife: 'Greek Life',
        charity: 'Charity',
        religion: 'Religion',
        sports: 'Sports/Games',
        animals: 'Animals',
        mascots: 'Mascots',
        america: 'America',
        military: 'Military',
        colleges: 'Colleges',
        transportation: 'Transportation',
        school: 'School',
        people: 'People',
        food: 'Food/Drink'
    };

    vm.fonts = {
      roboto: 'roboto',
      spirax: 'spirax',
      macondo: 'macondo',
      pressStart: 'pressStart',
      gloria: 'gloria',
    };

    vm.slider = {
      value: 30,
      options: {
        floor: 10,
        ceil: 50
        }
      };

    function showCategory (name) {
        $http.get(`${SERVER}/cliparts?category=${name}`)
            .then(resp =>   {
                vm.catData = resp.data;
            })

    }
    function emptyCatData() {
        vm.catData = null;
    }

    function tossImage(image) {
        $scope.$emit('image', image);
    }

    function addText(text) {
      $scope.$emit('addText', text);
      vm.text = null;
    }

    function showPicker() {
        window.client.pick({
        }).then(function(result) {

            let clipartUpload = {
              url: result.filesUploaded[0].url,
              name: result.filesUploaded[0].filename,
              category: 'Emojis'
            };
            $http.post(`${SERVER}/cliparts`, clipartUpload)
            .then (resp => console.log(resp));
        });
    }

    function changeFont (font) {
      let selectedFont = font;
      $scope.$emit('changeFont', selectedFont);
    }

    function fontSize () {
      $scope.$emit('fontSize', vm.slider.value);
    }

    $scope.$on('textInput', (event,text) => {
      vm.currentText = text;
    });

    function updateText (text) {
      $scope.$emit('updateText', text);
    }

    function selectedAddText () {
      if ($rootScope.textSelected === true) {
        $rootScope.textSelected = false;
      }
    }

    function selectedUpdateText () {
      $rootScope.textSelected = true;
    }

}

LeftSandboxController.$inject = ['$scope', '$http', 'SERVER', '$rootScope'];

export default LeftSandboxController;
