const converter = {
    mass: {
        name: 'Mass',
        units: {
            gram: {
                name: 'Gram',
                formula: 1
            },
            poinds: {
                name: 'Pounds',
                formula: 453.592
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
            millisecond: {
                name: 'Millisecond',
                formula: 1
            },
            second: {
                name: 'Second',
                formula: 1000
            },
            miniute: {
                name: 'Miniute',
                formula: 60000

            },
            hour: {
                name: 'Hour',
                formula: 3600000

            },
            day: {
                name: 'Day',
                formula: 86400000
            }
        }
    },
    data: {
        name: 'Data',
        units: {
            bits: {
                name: 'Bits',
                formula: 1
            },
            bytes: {
                name: 'Bytes',
                formula: 8
            },
            kilobytes: {
                name: 'Kilobytes',
                formula: 8192
            },
            megabytes: {
                name: 'Megabytes',
                formula: 8388608
            },
            gigabytes: {
                name: 'Gigabytes',
                formula: 8589934592
            },
            terabytes: {
                name: 'Terabytes',
                formula: 8796093022208
            },
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

        if (leftInput.value == 0 || rightInput.value == 0) {
            leftInput.value = '';
            rightInput.value = '';
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