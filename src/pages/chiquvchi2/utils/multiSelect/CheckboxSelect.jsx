import React, { useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MultiSelect } from "react-multi-select-component";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const animatedComponents = makeAnimated();

const options2 = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

export default function CheckboxSelect() {
    const [selected, setSelected] = useState([]);
    return (
        <>
            <div style={{ width: "400px", margin: "50px auto" }}>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[options[0], options[1]]}
                    isMulti
                    options={options}
                />
            </div>

            <div style={{ width: "400px", margin: "50px auto" }}>
                <MultiSelect
                    options={options2}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
            </div>

            <div class="form-group">
                <label>With <span class="font-weight-semibold">Выбрать все</span> варианты</label>
                <span class="multiselect-native-select">
                    <select class="form-control multiselect-select-all" multiple="multiple">
                        <option value="cheese">Cheese</option>
                        <option value="tomatoes">Tomatoes</option>
                        <option value="mozarella">Mozzarella</option>
                        <option value="mushrooms">Mushrooms</option>
                    </select>
                    <div class="dropdown" style={{ width: "100%" }}>
                        <button type="button"
                            class="multiselect dropdown-toggle btn"
                            data-toggle="dropdown"
                            title="Cheese, Tomatoes, Mozzarella, Mushrooms"
                            style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}
                            aria-expanded="false">
                            <span class="multiselect-selected-text">Все выбрано (4)</span>
                        </button>

                        <div class="multiselect-container dropdown-menu">
                            <div class="multiselect-all" title=" Select all">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="multiselect-all" />
                                    <span class="custom-control-label w-100 font-weight-bold"> Выбрать все </span>
                                </label>
                            </div>
                            <div class="multiselect-item" title="Cheese">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="cheese" />
                                    <span class="custom-control-label w-100">Cheese</span>
                                </label>
                            </div>
                            <div class="multiselect-item" title="Tomatoes">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="tomatoes" />
                                    <span class="custom-control-label w-100">Tomatoes</span>
                                </label>
                            </div>
                            <div class="multiselect-item" title="Mozzarella">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="mozarella" />
                                    <span class="custom-control-label w-100">Mozzarella</span>
                                </label>
                            </div>
                            <div class="multiselect-item" title="Mushrooms">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="mushrooms" />
                                    <span class="custom-control-label w-100">Mushrooms</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </span>
            </div>



            <div class="form-group">
                <label>Кликабельные оптгруппы</label>
                <span class="multiselect-native-select">
                    <select class="form-control multiselect-clickable-groups" multiple="multiple" data-fouc="">
                        <optgroup label="Mathematics">
                            <option value="analysis">Analysis</option>
                            <option value="algebra">Linear Algebra</option>
                            <option value="discrete">Discrete Mathematics</option>
                        </optgroup>
                        <optgroup label="Computer Science">
                            <option value="programming">Introduction to Programming</option>
                            <option value="complexity">Complexity Theory</option>
                            <option value="software">Software Engineering</option>
                        </optgroup>
                        <optgroup label="Physics">
                            <option value="mechanics">Classical Mechanics</option>
                            <option value="magnetism">Electromagnetism</option>
                            <option value="quantum">Quantum Mechanics</option>
                        </optgroup>
                    </select>
                    <div class="dropdown position-static" style={{ width: "100%" }}>
                        <button type="button" class="multiselect dropdown-toggle btn"
                            data-toggle="dropdown" title="Analysis, Linear Algebra, Discrete Mathematics, Introduction to Programming, Complexity Theory, Software Engineering"
                            style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}
                            aria-expanded="false">
                            <span class="multiselect-selected-text">6 selected</span>
                        </button>
                        <div class="multiselect-container dropdown-menu">
                            <div class="multiselect-item multiselect-group" title="Mathematics">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="" />
                                    <span class="custom-control-label w-100">Mathematics</span>
                                </label>
                            </div>
                            <div class="multiselect-item multiselect-group-option-indented" title="Analysis">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="analysis" />
                                    <span class="custom-control-label w-100">Analysis</span>
                                </label>
                            </div>
                            <div class="multiselect-item multiselect-group-option-indented" title="Linear Algebra">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="algebra" />
                                    <span class="custom-control-label w-100">Linear Algebra</span>
                                </label>
                            </div>
                            <div class="multiselect-item multiselect-group-option-indented" title="Discrete Mathematics">
                                <label class="dropdown-item custom-control flex-1 custom-checkbox">
                                    <input class="custom-control-input" type="checkbox" value="discrete" />
                                    <span class="custom-control-label w-100">Discrete Mathematics</span>
                                </label>
                            </div>
                            {/* <div class="multiselect-item multiselect-group" title="Computer Science"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value=""><span class="custom-control-label w-100">Computer Science</span></label></div><div class="multiselect-item multiselect-group-option-indented" title="Introduction to Programming"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value="programming"><span class="custom-control-label w-100">Introduction to Programming</span></label></div><div class="multiselect-item multiselect-group-option-indented" title="Complexity Theory"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value="complexity"><span class="custom-control-label w-100">Complexity Theory</span></label></div><div class="multiselect-item multiselect-group-option-indented" title="Software Engineering"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value="software"><span class="custom-control-label w-100">Software Engineering</span></label></div><div class="multiselect-item multiselect-group" title="Physics"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value=""><span class="custom-control-label w-100">Physics</span></label></div><div class="multiselect-item multiselect-group-option-indented" title="Classical Mechanics"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value="mechanics"><span class="custom-control-label w-100">Classical Mechanics</span></label></div><div class="multiselect-item multiselect-group-option-indented" title="Electromagnetism"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value="magnetism"><span class="custom-control-label w-100">Electromagnetism</span></label></div><div class="multiselect-item multiselect-group-option-indented" title="Quantum Mechanics"><label class="dropdown-item custom-control flex-1 custom-checkbox"><input class="custom-control-input" type="checkbox" value="quantum"><span class="custom-control-label w-100">Quantum Mechanics</span></label></div></div></div></span> */}
                        </div >
                    </div>
                </span>
            </div>
        </>
    )
}
