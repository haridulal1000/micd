import React, { useEffect, useState } from 'react';
import {
    IFieldItem,
    IFieldOption,
} from '../../core/interfaces/teeth.interface';
import CollapseComponent from '../collapse/collapse';
import { FieldDisplayTypeEnum, FieldTypeEnum } from '../../core/enums/teeth.enum';
import SelectInputComponent from '../select-input/select-input';
import ToggleListComponent from '../toggle-list/toggle-llist';
import RadioInputComponent from '../radio-input/radio';

export interface ICheckBoxComponentProp {
    fieldChild: IFieldItem;
    field_options: IFieldOption[];
    selectedItem?: number | null;
    isSquare?: boolean;
    onItemUpdated: (fieldId: number, updateValue: object) => void;
}
function CheckboxComponent(props: ICheckBoxComponentProp) {
    const [selectedItem, setSelectedItem] = useState<number | null>();
    useEffect(() => {
        setSelectedItem(props?.selectedItem || null);
    }, [props.selectedItem]);
    return (
        <CollapseComponent fieldValue={props.fieldChild.field_value}
            key={props.fieldChild.id}
            name={props.fieldChild.text}>
            <div>
                {/* {props.fieldChild.children.map((field: IFieldItem) => ( */}
                <div
                >
                    {props.fieldChild?.children
                        ?.filter(
                            (fieldChild: IFieldItem) =>
                                fieldChild.display ===
                                FieldDisplayTypeEnum.HORIZONTAL_SELECT,
                        )
                        .map((fieldChild: IFieldItem) => (
                            <div
                                key={fieldChild.id}
                                className="grid grid-cols-10 items-center my-4"
                            >
                                <div className="col-span-2">
                                    {fieldChild.text}:
                                </div>
                                <div className="col-span-8">
                                    <ToggleListComponent
                                        type={fieldChild.type}
                                        key={fieldChild.id}
                                        listItems={
                                            fieldChild.field_options
                                        }
                                        selectedItem={
                                            fieldChild.type === FieldTypeEnum.SINGLE_SELECT ?
                                                [fieldChild.field_value.value_single_select
                                                ] : [...fieldChild.field_value.value_multi_select]
                                        }
                                        onItemUpdated={(
                                            selected: number[],
                                        ): void => {
                                            if (fieldChild.type === FieldTypeEnum.SINGLE_SELECT) {


                                                props.onItemUpdated(
                                                    fieldChild
                                                        ?.field_value
                                                        .id,
                                                    {
                                                        value_single_select:
                                                            selected[0],
                                                    },
                                                );
                                            } else {
                                                props.onItemUpdated(
                                                    fieldChild
                                                        ?.field_value
                                                        .id,
                                                    {
                                                        value_multi_select:
                                                            selected,
                                                    },
                                                );
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    {props.fieldChild?.children
                        ?.filter(
                            (fieldChild: IFieldItem) =>
                                fieldChild.display ===
                                FieldDisplayTypeEnum.RADIO,
                        )
                        .map((fieldChild: IFieldItem) => (
                            <RadioInputComponent
                                key={fieldChild.id}
                                fieldChild={fieldChild}
                                field_options={
                                    fieldChild.field_options
                                }
                                selectedItem={
                                    fieldChild?.field_value
                                        ?.value_single_select
                                }
                                onItemUpdated={(
                                    valueId: number,
                                    optionId: number,
                                ) => {
                                    props.onItemUpdated(optionId,
                                        { value_single_select: valueId });
                                }}
                            />
                        ))}
                    {props.fieldChild?.children
                        ?.filter(
                            (fieldChild: IFieldItem) =>
                                fieldChild.display ===
                                FieldDisplayTypeEnum.DROP_DOWN_SELECT,
                        )
                        .map((fieldChild: IFieldItem) => (
                            <div
                                key={fieldChild?.id}
                                className="grid grid-cols-10 items-center my-4"
                            >
                                <div className="col-span-2">
                                    {fieldChild.text}
                                </div>
                                <div className="col-span-8 p-2 bg-primaryPastelDream w-full rounded-sm">
                                    <SelectInputComponent
                                        selectedItem={
                                            fieldChild?.field_value
                                                ?.value_single_select
                                        }
                                        fieldChild={fieldChild}
                                        field_options={
                                            fieldChild?.field_options
                                        }
                                        onItemUpdated={(
                                            valueId: number,
                                            optionId: number,
                                        ) => {
                                            props.onItemUpdated(
                                                optionId,

                                                { value_single_select: valueId },
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    {props.fieldChild?.children
                        ?.filter(
                            (fieldChild: IFieldItem) =>
                                fieldChild.display ===
                                FieldDisplayTypeEnum.CHECK_BOX,
                        )
                        .map((fieldChild: IFieldItem) => (
                            // <CollapseComponent fieldValue={fieldChild.field_value}
                            //     key={fieldChild.id}
                            //     name={fieldChild.text}>
                            //     <div>{fieldChild.text}</div>
                            // </CollapseComponent>
                            <CheckboxComponent key={fieldChild.id} fieldChild={fieldChild} field_options={fieldChild.field_options} onItemUpdated={(
                                valueId: object,
                                optionId: number,
                            ) => {
                                props.onItemUpdated(
                                    optionId,

                                    { value_bool: valueId }
                                );
                            }} />
                        ))}
                </div>
            </div>

        </CollapseComponent>
    );
}
export default CheckboxComponent;
