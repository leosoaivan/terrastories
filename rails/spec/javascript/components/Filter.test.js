import React from 'react';
import { mount } from 'enzyme';
import Filter from '../../../app/javascript/components/Filter';

const categories = ['Region', 'Type of place', 'Speaker'];
const filterMap = {
	'Region': ['California', 'Washington DC'],
	'Type of place': ['college campus', 'nonprofit campus'],
	'Speaker': ['Corinne Henk', 'Miranda Wang', 'Rudo Kemper']
}

describe('Filter component', () => {
	beforeEach(() => {
    global.I18n = {
      t: jest.fn(),
    };
	})
	
	it('Displays two Selects for filtering', () => {
		const wrapper = mount(
			<Filter 
				categories={categories}
				filterMap={filterMap}
				filterCategory='Select category'
				filterItem='Select option'
				handleFilterCategoryChange={() => {}}
				handleFilterItemChange={() => {}}
				itemOptions={[]}
			/>
		);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Select.categoryFilter').length).toEqual(1);
		expect(wrapper.find('Select.itemFilter').length).toEqual(1);
	});

	it('Enables selection of a category', () => {
		const wrapper = mount(
			<Filter 
				categories={categories}
				filterMap={filterMap}
				filterCategory='Select category'
				filterItem='Select option'
				handleFilterCategoryChange={() => {}}
				handleFilterItemChange={() => {}}
				itemOptions={[]}
			/>
		);
		const select = wrapper.find('Select.categoryFilter');
		const dropdown = select.find('.select__dropdown-indicator');

		expect(select.text()).toMatch(/select category/i);
		dropdown.simulate('mouseDown', { button: 0 });
		expect(wrapper.find('.select__menu-list').children().length).toEqual(categories.length);
		wrapper.find('.select__option').first().simulate('mouseDown', { button: 0 });
		expect(select.text()).toMatch(categories[0]);
	});

	it('Enables selection of an option only after selecting a category', () => {
		const wrapper = mount(
			<Filter 
				categories={categories}
				filterMap={filterMap}
				filterCategory='Select category'
				filterItem='Select option'
				handleFilterCategoryChange={() => {}}
				handleFilterItemChange={() => {}}
				itemOptions={[]}
			/>
		);

		wrapper
			.find('Select.itemFilter .select__dropdown-indicator')
			.simulate('mouseDown', { button: 0 })
			
		expect(wrapper.find('.select__menu-list').children().length).toEqual(1);
		expect(wrapper.find('.select__menu-list').first().text()).toMatch(/no options/i);

		wrapper
			.find('Select.categoryFilter .select__dropdown-indicator')
			.simulate('mouseDown', { button: 0 })
		wrapper
			.find('.select__menu-list')
			.first()
			.simulate('mouseDown', { button: 0 })
		wrapper
			.find('Select.itemFilter .select__dropdown-indicator')
			.simulate('mouseDown', { button: 0 })
		wrapper
			.find('.select__menu-list')
			.first()
			.simulate('mouseDown', { button: 0 })

		expect(wrapper.find('.select__menu-list').children().length).toBeGreaterThan(1);
		expect(wrapper.find('.select__menu-list').first().text()).not.toMatch(/no options/i);
	});
});