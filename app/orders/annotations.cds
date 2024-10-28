using CatalogService as service from '../../srv/catalog-service';

annotate service.Orders with @(
    UI.HeaderInfo                : {
        TypeName      : '{i18n>Order}',
        TypeNamePlural: '{i18n>Orders}',
        Title         : {Value: id},
        Description   : {Value: email}
    },
    UI.SelectionFields           : [
        country,
        firstname,
        createon
    ],
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>id}',
                Value: id,
            },
            {
                $Type: 'UI.DataField',
                Label: 'email',
                Value: email,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>firstname}',
                Value: firstname,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>lastname}',
                Value: lastname,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>country}',
                Value: country,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>createon}',
                Value: createon,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>deliverydate}',
                Value: deliverydate,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>orderstatus}',
                Value: orderstatus,
            },
            {
                $Type: 'UI.DataField',
                Label: 'imageurl',
                Value: imageurl,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : '{i18n>GeneratedFacet1}',//General Information}',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            //Label: 'id',
            Label: '{i18n>id}',
            Value: id,
        },
        {
            $Type: 'UI.DataField',
            Label: 'email',
            Value: email,
        },
        {
            $Type: 'UI.DataField',
            //Label: 'firstname',
            Label: '{i18n>firstname}',
            Value: firstname,
        },
        {
            $Type: 'UI.DataField',
            //Label: 'lastname',
            Label: '{i18n>lastname}',
            Value: lastname,
        },
        {
            $Type: 'UI.DataField',
            //Label: 'country',
            Label: '{i18n>country}',
            Value: country,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>createon}',
            Value: createon,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>deliverydate}',
            Value: deliverydate,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>orderstatus}',
            Value: orderstatus,
        },
    ],
);
annotate service.Orders with {
    country    @title : '{i18n>country}';
    firstname  @title : '{i18n>firstname}';
    createon   @title : '{i18n>createon}';
};