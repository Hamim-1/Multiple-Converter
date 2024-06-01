const converter = {
    mass: {
        name: 'Mass',
        units: {
            gram: {
                name: 'Gram',
                formula: 1
            },
            kilogram: {
                name: 'Kilogram',
                formula: 1000
            },
            tonne: {
                name: 'Tonne',
                formula: 1000000
            }
        }
    },
    time: {
        name: 'Time',
        units: {
            second: {
                name: 'Second',
                formula: 1
            },
            miniute: {
                name: 'Miniute',
                formula: 60

            },
            hour: {
                name: 'Hour',
                formula: 3600

            }
        }
    }
}

function main() {
    const allConverterName = Object.keys(converter);
    const selectCategory = document.getElementById('category-select');
    const rightSelect = document.getElementById('right-select');
    const leftSelect = document.getElementById('left-select');
    const rightInput = document.getElementById('right-input');
    const leftInput = document.getElementById('left-input');
    let leftSelectedOption;
    let rightSelectedOption;
    let selectedCategory;
    removeOption(selectCategory);
    removeOption(rightSelect);
    removeOption(leftSelect);
    allConverterName.forEach(value => {
        addOption(selectCategory, { value: value, name: converter[value].name });
    });
    selectedCategory = selectCategory.value;
    const dafaultCatrgotyOption = Object.keys(converter[allConverterName[0]].units);
    dafaultCatrgotyOption.forEach(value => {
        addUnits(leftSelect, rightSelect, { value: value, name: converter.mass.units[value].name })
    });
    selectCategory.addEventListener('change', changeCategoty);
    leftSelect.addEventListener('change', changeUnits);
    rightSelect.addEventListener('change', changeUnits);
    rightInput.addEventListener('input', doCalculation);
    leftInput.addEventListener('input', doCalculation);











    function addOption(parent, object) {
        const option = document.createElement('option');
        option.setAttribute('value', object.value);
        option.innerText = object.name;
        parent.appendChild(option);
    }

    function addUnits(parent, parent2, object) {
        addOption(parent, object);
        addOption(parent2, object);
        parent2.selectedIndex = 1;
        console.log(parent2.selected);
    }

    function removeOption(parent) {
        parent.innerText = '';
    }

    function changeCategoty() {
        removeOption(leftSelect);
        removeOption(rightSelect)
        const currentSelectedCategory = selectCategory.value;
        const selectedCategoryUnits = converter[currentSelectedCategory].units;
        Object.keys(selectedCategoryUnits).forEach(value => {
            addUnits(leftSelect, rightSelect, { value: value, name: converter[currentSelectedCategory].units[value].name });
        });
        leftSelectedOption = leftSelect.value;
        rightSelectedOption = rightSelect.value;
        selectedCategory = selectCategory.value;
        leftInput.value = '';
        rightInput.value = '';

    }
    leftSelectedOption = leftSelect.value;
    rightSelectedOption = rightSelect.value;

    function changeUnits(event) {
        const clickedSide = event.target;
        if (clickedSide.id === 'right-select') {
            if (clickedSide.value === leftSelectedOption) {
                leftSelect.value = rightSelectedOption;
                const temNum = leftInput.value;
                leftInput.value = rightInput.value;
                rightInput.value = temNum;
            } else {
                leftSelectedOption = leftSelect.value;
                rightSelectedOption = rightSelect.value;
                doCalculation(leftInput);

            }
        } else {
            if (clickedSide.value === rightSelectedOption) {
                rightSelect.value = leftSelectedOption;
                const temNum = rightInput.value;
                rightInput.value = leftInput.value;
                leftInput.value = temNum;
            } else {
                leftSelectedOption = leftSelect.value;
                rightSelectedOption = rightSelect.value;
                doCalculation(leftInput);
            }
        }
        leftSelectedOption = leftSelect.value;
        rightSelectedOption = rightSelect.value;

    }

    function doCalculation(event) {
        const inputSide = event.target ? event.target : event;
        const userInput = Number(inputSide.value);
        if (userInput === 0 || userInput < 1) {
            userInput.value = '';
        }
        if (inputSide.id === 'left-input') {
            const num = converter[selectedCategory].units[leftSelectedOption].formula * userInput;
            rightInput.value = num / converter[selectedCategory].units[rightSelectedOption].formula;
        } else {
            const num = converter[selectedCategory].units[rightSelectedOption].formula * userInput;
            leftInput.value = num / converter[selectedCategory].units[leftSelectedOption].formula;
        }
    }
}


main();