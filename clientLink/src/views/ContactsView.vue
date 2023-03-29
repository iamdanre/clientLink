<script setup>
// @ts-nocheck
import { HollowDotsSpinner } from 'epic-spinners'
import IconPlus from '../components/icons/IconPlus.vue';
import IconMinus from '../components/icons/IconMinus.vue';
import IconLink from '../components/icons/IconLink.vue';
import IconUnlink from '../components/icons/IconUnlink.vue';
import { ref } from 'vue';
import * as contactService from '../services/contactService.js';
import * as clientService from '../services/clientService.js';
import { reset } from '@formkit/core';
import instance from '../main.js';

const loading = ref(true);
const createContactForm = ref(false);
const contacts = ref([]);
contactService.getAllContacts().then((data) => {
  contacts.value = data;
  //delay to show spinner if request is fast
  setTimeout(() => {
    loading.value = false;
  }, 850);
});

const createContact = async (fields) => {
  contactService.addContact(fields).then(
    (data) => {
      console.log(data);
      contacts.value.push(data);
      // sort the contacts by surnname then name
      contacts.value.sort((a, b) => {
        let surnameA = a.surname.toUpperCase();
        let surnameB = b.surname.toUpperCase();
        if (surnameA < surnameB) {
          return -1;
        }
        if (surnameA > surnameB) {
          return 1;
        }
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      reset('contactForm');
      let message = `${data.name} ${data.surname} created`;
      instance.success(message, {
        position: "top-right",
        timeout: 5000,
        offset: "30px",
        transition: "scale",
      });
      createContactForm.value = false;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 500) {
        instance.error("Contact already exists", {
          position: "bottom-left",
          timeout: 5000,
          offset: "30px",
          transition: "scale",
        });
      }
    }
  );
}

const clients = ref([]);
const linkClientForm = ref(false);
const unLinkClientForm = ref(false);
const selectedClient = ref('');
const selectedContact = ref('');

clientService.getAllClients().then((data) => {
  for (let i = 0; i < data.length; i++) {
    let client = { value: data[i]._id, label: data[i].name + " - " + data[i].clientCode, attrs: { disabled: false } };
    clients.value.push(client);
  }
});

const linkClient = async (fields) => {
  contactService.linkClient(selectedContact.value.contact._id, fields.clientId).then(
    (data) => {
      // update the contact in the contacts array
      for (let i = 0; i < contacts.value.length; i++) {
        if (contacts.value[i]._id === data._id) {
          contacts.value[i] = data;
        }
      }
      reset('linkClientForm');
      // find contact in contacts array
      let client;
      for (let i = 0; i < clients.value.length; i++) {
        if (contacts.value[i].value === fields.clientId) {
          client = contacts.value[i];
        }
      }
      let message = `${selectedContact.value.contact.clientCode} linked to ${client.label.split(' (')[0]}`;
      instance.success(message, {
        position: "bottom-left",
        timeout: 5000,
        offset: "30px",
        transition: "scale",
      });
      linkClientForm.value = false;
      selectedContact.value = '';
      selectedClient.value = '';
    },
    (error) => {
      console.log(error);
    }
  );
}

const unLinkClient = async (fields) => {
  contactService.unLinkClient(fields).then(
    (data) => {
      for (let i = 0; i < contacts.value.length; i++) {
        if (contacts.value[i]._id === data._id) {
          contacts.value[i] = data;
        }
      }
      reset('unLinkClientForm');
      // find client in clients array
      let message = `${data.name} ${data.surname} unlinked from ${selectedClient.value.label}`;
      instance.success(message, {
        position: "top-right",
        timeout: 5000,
        offset: "30px",
        transition: "scale",
      });
      unLinkClientForm.value = false;
      selectedContact.value = '';
      selectedClient.value = '';
    },
    (error) => {
      console.log(error);
      if (error.response.status === 500) {
        instance.error("Contact not linked to client", {
          position: "bottom-left",
          timeout: 5000,
          offset: "30px",
          transition: "scale",
        });
      }
    }
  );
}

function clickUnlink(contact) {
  selectedContact.value = { contact };
  clients.value.forEach(client => {
    if (contact.linkedClients.includes(client.value)) {
      client.attrs.disabled = false;
    } else {
      client.attrs.disabled = true;
    }
  });
  linkClientForm.value = false;
  unLinkClientForm.value = true;
  createContactForm.value = false;
  createClientForm.value = false;
}

function clickLink(contact) {
  selectedContact.value = { contact };
  clients.value.forEach(client => {
    if (contact.linkedClients.includes(client.value)) {
      client.attrs.disabled = true;
    } else {
      client.attrs.disabled = false;
    }
  });
  unLinkClientForm.value = false;
  linkClientForm.value = true;
  createContactForm.value = false;
  createClientForm.value = false;
}
</script>

<template>
  <main>
    <div class="loading" v-if="loading">
      <hollow-dots-spinner :animation-duration="900" :dot-size="20" :dots-num="3" color="#00bd7e" />
    </div>

    <div class="createForm" v-if="createContactForm">
      <FormKit id="contactForm" type="form" @submit="createContact" submit-label="Create Contact" :submit-attrs="{
        inputClass: 'submit-button'
      }" #default="{ value }">
        <div id="inputFields">
          <FormKit type="text" name="name" id="contactName" validation="required:trim" label="Contact Name"
            help="Enter name" />
          <FormKit type="text" name="surname" id="contactSurname" validation="required:trim" label="Contact Surname"
            help="Enter surname" />
        </div>
        <FormKit type="email" name="email" id="contactEmail" validation="required:trim" label="Contact e-Mail"
          help="Enter e-Mail" />
      </FormKit>
    </div>

    <div class="linkClientForm" v-if="linkClientForm && !createContactForm">
      <FormKit id="linkClientForm" type="form" @submit="linkClient" submit-label="Link Client" :submit-attrs="{
        inputClass: 'submit-button'
      }">
        <div id="inputFields">
          <FormKit type="select" name="client" id="client" validation="required" label="Select Client"
            :options="clients" />
          <FormKit type="hidden" name="contact" id="contact" :value="selectedContact.contact._id" />
        </div>
      </FormKit>
    </div>

    <div class="unLinkClientForm" v-if="unLinkClientForm && !createContactForm">
      <FormKit id="unLinkClientForm" type="form" @submit="unLinkClient" submit-label="Unlink Client" :submit-attrs="{
        inputClass: 'submit-button'
      }">
        <div id="inputFields">
          <FormKit type="select" name="client" id="client" validation="required" label="Select Client"
            :options="clients" />
          <FormKit type="hidden" name="contact" id="contact" :value="selectedContact.contact._id" />
        </div>
      </FormKit>
    </div>

    <div v-if="contacts.length === 0 && !loading">
      <h1>No contact(s) found</h1>
    </div>
    <div v-else>
      <table v-if="!loading">
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>e-Mail</th>
          <th>Number of Linked Clients</th>
        </tr>
        <tr v-for="contact in contacts" :key="contacts.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.surname }}</td>
          <td>{{ contact.email }}</td>
          <td class="centre">
            <IconUnlink @click="clickUnlink(contact)" />
            {{ contact.linkedClients.length }}
            <IconLink @click="clickLink(contact)" />
          </td>
        </tr>
      </table>
    </div>
  </main>
  <div v-if="!createContactForm && !linkClientForm && !unLinkClientForm" @click="createContactForm = true">
    <IconPlus />
  </div>
  <div v-else @click="createContactForm = false; linkClientForm = false; unLinkClientForm = false">
    <IconMinus />
  </div>
</template>

<style lang="scss">
$green: hsla(160, 100%, 37%, 1);

table {
  border-collapse: collapse;
  border: 1px solid black;
  padding: 5px;
  border-spacing: 5px;
  border-color: white;
  width: 100%;
}

@media (max-width: 1024px) {
  table {
    margin-top: 2rem;
  }

  .loading {
    margin-top: 6rem;
    align-items: baseline !important;
    height: auto !important;
  }
}

th {
  border: 1px solid black;
  border-spacing: 5px;
  border-color: white;
  color: $green;
}

td {
  border: 1px solid black;
  border-spacing: 5px;
  border-color: white;
  padding: 5px;
}

.centre {
  text-align: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.createForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.linkClientForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.unLinkClientForm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  .submit-button {
    background-color: #F33A6A;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .submit-button:hover {
    background-color: darken(#F33A6A, 10%);
  }
}

.submit-button {
  background-color: $green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: darken($green, 10%);
  }
}

.success {
  padding: 0.75em;
  border-radius: 0.5em;
  background-color: $green;
  margin: 1em 0;
}

#inputFields {
  // next to each other in a row with margin 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
