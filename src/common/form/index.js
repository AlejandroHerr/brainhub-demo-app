export default {
  title: 'Event Registration',
  fields: [
    {
      name: 'name',
      displayName: 'Name',
      type: 'text',
      validators: ['isRequired'],
    },
    {
      name: 'surname',
      displayName: 'Surname',
      type: 'text',
      validators: ['isRequired'],
    },
    {
      name: 'email',
      displayName: 'E-Mail',
      type: 'email',
      validators: ['isRequired', 'isEmail'],
    },
    {
      name: 'date',
      displayName: 'Date',
      type: 'date',
      validators: ['isRequired', 'isDate'],
    },
  ],
};
