var badge2text = {
  'badge-warning': 'issues',
  'badge-danger': 'error',
  'badge-success': 'no issues'
}

function updateGroup (badgeElement, badgeType) {
  if (badgeElement.hasClass('badge-secondary')) {
    badgeElement.removeClass('badge-secondary').addClass(badgeType)
    badgeElement.text(badge2text[badgeType])
  } else if (badgeElement.hasClass('badge-success') && badgeType !== 'badge-success') {
    badgeElement.removeClass('badge-success').addClass(badgeType)
    badgeElement.text(badge2text[badgeType])
  }
}

$('.collapse .list-group-item').each(function (index, element) {
  $.getJSON('/service?host=' + element.id.split('-')[0] + '&service=' + element.id.split('-')[1], function (data) {
    console.log(data)
    let groupBadge = $('#' + element.id.split('-')[0] + '-group-badge')
    let elementBadge = $('#' + element.id + '-badge')
    let newBadgeType
    if (data.status === 'success') {
      if (data.serviceStatus) {
        newBadgeType = 'badge-success'
        // elementBadge.text('no issues')
      } else {
        newBadgeType = 'badge-warning'
        // elementBadge.text('issues')
      }
    } else {
      newBadgeType = 'badge-danger'
      // elementBadge.text('error')
    }
    elementBadge.removeClass('badge-secondary').addClass(newBadgeType)
    elementBadge.text(badge2text[newBadgeType])
    updateGroup(groupBadge, newBadgeType)

  })
})
