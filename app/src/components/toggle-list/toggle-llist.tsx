import React, { useEffect, useState } from 'react';
import {
	ILabelValue,
	IToggleListProps,
} from '../../core/interfaces/common.interface';
import { IFieldOption } from '../../core/interfaces/teeth.interface';
import { FieldTypeEnum } from '../../core/enums/teeth.enum';

function ToggleListComponent(props: IToggleListProps) {
	const [selectedItem, setSelectedItem] = useState<Map<number, number>>(new Map());
	useEffect(() => {
		const map = new Map();
		props.selectedItem?.forEach(item => map.set(item, item));
		setSelectedItem(map);
	}, [props.selectedItem]);
	return (
		<div className="flex items-center">
			<div className="flex gap-1">
				{props.listItems.map((item: IFieldOption) => (
					<button
						key={item.value}
						className={`border-2 border-night rounded-sm p-2 h-8 flex items-center justify-center cursor-pointer ${props?.isSquare ? 'w-8' : 'min-w-[2rem]'
							} ${selectedItem?.get(item.id)
								? 'text-primary border-primary bg-primary bg-opacity-25 font-extrabold'
								: ''
							}`}
						onClick={() => {
							if (props.type === FieldTypeEnum.SINGLE_SELECT) {
								const map = new Map();
								map.set(item.id, item.id);
								setSelectedItem(map);
								props.onItemUpdated([item.id]);
							} else {
								const map = selectedItem;
								if (map?.get(item.id)) {
									map.delete(item.id);
								} else {
									map?.set(item.id, item.id);
								}
								setSelectedItem(map);
								props.onItemUpdated([...Array.from(map?.keys())])

							}
						}}
					>
						{item.value}
					</button>
				))}
			</div>
		</div>
	);
}
export default ToggleListComponent;
