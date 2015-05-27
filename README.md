# jquery.iscroll
A feature rich jquery infinite scroll plugin for HUMANS.

Easy to integrate and less javascript hassle.

-- initialization
simple
`$('selector').iscroll();`
with options
`$('selector').iscroll({options:value});`

-- what can be a selector

you can use any div which has a vertical scrollbar i.e. `overflow-y: scroll`. if the selector does not have `overflow:scroll` then the scroll event is attached to document.
the new content will be appended to the given selector.

you have to put an `<a>` tag at the end of your content which points to the next page.
also all the content loaded must have a this `<a>` tag at the end.
absence of this tag will cause the end of results.

-- Default options are
`
{
        Loadingoffset: 20,
        optionsData: '{}',
        loadingHtml: '<small>Loading...</small>', // null
        sendReqonInit:false,
        autoTrigger: true, //must be true for autoTriggerUntil
        autoTriggerUntil: false,
        next:'a._next',
        onBeginRequest: null,
        ondataArrival: null
}
`


Will provide elaborated documentation soon.

Thanks.

