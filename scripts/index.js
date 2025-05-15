import { fetchDatas } from '../data/fetchData.js'

renderPage()

async function renderPage() {
  const data = await fetchDatas()
  const [a, b, c] = Object.values(data)
  const allEvents = a.concat(b, c)
  const onlineEvents = allEvents.filter(item => item.type === 'online')

  createEvents(allEvents, 'near')
  createEvents(onlineEvents, 'uncoming')
}

function createEvents(events, type) {
  const nearEventsList = document.querySelector('.events__near-list')
  const uncomingEventsList = document.querySelector('.events__uncoming-list')

  for (let i = 0; i < (type === 'uncoming' ? 4 : 8); i++) {
    const event = events[i]
    const listItem = document.createElement('li')
    const date = renderDate(event.date).toUpperCase().split(' AT ').join(' · ')

    listItem.classList.add('events__list-item')
    listItem.innerHTML = `
        <div class="events__img" style="background-image: url(${event.image})">
        ${
          event.type === 'online'
            ? '<div class="events__online">Online Event</div>'
            : ''
        }
        </div>
        <div class="events__text">
        <p class="events__date--mobile">
        ${date ? date : 'Error date'}</p>
        <h3 class="events__title">${
          event.title ? event.title : 'Error title'
        }</h3>
        <div class="events__location">${
          event.category ? event.category : 'Error location'
        } 
          ${event.distance ? `(${event.distance} km)` : ''}
        </div>
        ${
          event.type === 'online'
            ? '<div class="events__online events__online--mobile"> Online Event</div>'
            : ''
        }
        
        <p class="events__date--desktop">${date ? date : 'Error date'}</p>
        <div class="events__status--mobile">
            <div>${event.attendees ? `${event.attendees} going` : ''}</div>
        </div>
        </div>
        <div class="events__status--desktop">
        <div>${event.attendees ? `${event.attendees} going` : ''}</div>
        <div>Free</div>
        </div>
    `
    type === 'uncoming'
      ? uncomingEventsList.append(listItem)
      : nearEventsList.append(listItem)
  }
}
function renderDate(date) {
  const eventDate = new Date(date)
  let options = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    timezone: 'UTC',
    timeZoneName: 'short',
  }
  return eventDate.toLocaleString('en-US', options)
}
